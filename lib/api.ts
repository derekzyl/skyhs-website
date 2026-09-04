const DEFAULT_BASE =
  'https://uncertain-merrile-skyhs-dcb33d07.koyeb.app';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || DEFAULT_BASE;

export const ACCESS_TOKEN_KEY = 'sky_access_token';
export const REFRESH_TOKEN_KEY = 'sky_refresh_token';

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string | null): void {
  if (typeof window === 'undefined') return;
  if (token) localStorage.setItem(ACCESS_TOKEN_KEY, token);
  else localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function setRefreshToken(token: string | null): void {
  if (typeof window === 'undefined') return;
  if (token) localStorage.setItem(REFRESH_TOKEN_KEY, token);
  else localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function clearAuthTokens(): void {
  setAccessToken(null);
  setRefreshToken(null);
}

function mergeAuthEnvelope(decoded: Record<string, unknown>): Record<string, unknown> {
  const out = { ...decoded };
  const data = decoded.data;
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    const nested = data as Record<string, unknown>;
    if (nested.tokens != null) out.tokens = nested.tokens;
    if (nested.user != null) out.user = nested.user;
  }
  return out;
}

function extractAccessToken(decoded: Record<string, unknown>): string | null {
  const merged = mergeAuthEnvelope(decoded);
  const tokens = merged.tokens as Record<string, unknown> | undefined;
  const access = tokens?.access as Record<string, unknown> | undefined;
  if (typeof access?.token === 'string') return access.token;
  if (typeof merged.access_token === 'string') return merged.access_token as string;
  return null;
}

function extractRefreshToken(decoded: Record<string, unknown>): string | null {
  const merged = mergeAuthEnvelope(decoded);
  const tokens = merged.tokens as Record<string, unknown> | undefined;
  const refresh = tokens?.refresh as Record<string, unknown> | undefined;
  if (typeof refresh?.token === 'string') return refresh.token;
  if (typeof merged.refresh_token === 'string') return merged.refresh_token as string;
  return null;
}

/** Persist tokens from login/register body shapes: flat or nested under `data`. */
export function storeTokensFromLoginResponse(decoded: unknown): string | null {
  if (!decoded || typeof decoded !== 'object') return null;
  const body = decoded as Record<string, unknown>;
  const access = extractAccessToken(body);
  const refresh = extractRefreshToken(body);
  if (access) setAccessToken(access);
  if (refresh) setRefreshToken(refresh);
  return access;
}

function formatErrorMessage(body: unknown, fallback: string): string {
  if (!body) return fallback;
  if (typeof body === 'string') return body;
  if (typeof body === 'object') {
    const obj = body as Record<string, unknown>;
    const detail = obj.detail;
    if (typeof detail === 'string') return detail;
    if (detail && typeof detail === 'object') {
      const d = detail as Record<string, unknown>;
      if (typeof d.message === 'string') return d.message;
      if (typeof d.error === 'string') return d.error;
    }
    if (typeof obj.message === 'string') return obj.message;
    if (typeof obj.error === 'string') return obj.error;
  }
  return fallback;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  opts?: { auth?: boolean }
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };
  if (body !== undefined) headers['Content-Type'] = 'application/json';

  const useAuth = opts?.auth !== false;
  if (useAuth) {
    const token = getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let parsed: unknown = null;
  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }
  }

  if (!res.ok) {
    throw new ApiError(
      formatErrorMessage(parsed, res.statusText || `Request failed (${res.status})`),
      res.status,
      parsed
    );
  }

  return parsed as T;
}

export function apiGet<T>(path: string, opts?: { auth?: boolean }): Promise<T> {
  return request<T>('GET', path, undefined, opts);
}

export function apiPost<T>(
  path: string,
  body?: unknown,
  opts?: { auth?: boolean }
): Promise<T> {
  return request<T>('POST', path, body ?? {}, opts);
}

export function apiPut<T>(
  path: string,
  body?: unknown,
  opts?: { auth?: boolean }
): Promise<T> {
  return request<T>('PUT', path, body ?? {}, opts);
}

export async function login(
  email: string,
  password: string
): Promise<Record<string, unknown>> {
  const data = await apiPost<Record<string, unknown>>(
    '/api/v1/auth/login',
    { email, password },
    { auth: false }
  );
  storeTokensFromLoginResponse(data);
  return data;
}

export function errorMessage(err: unknown, fallback = 'Something went wrong'): string {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error) return err.message;
  return fallback;
}
