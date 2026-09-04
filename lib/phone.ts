/** Nigerian mobile helpers (align with backend normalize_ng_phone). */

export function normalizeNgPhone(raw: string): string | null {
  const cleaned = String(raw || '').replace(/[^\d+]/g, '').trim();
  let digits = cleaned.startsWith('+') ? cleaned.slice(1) : cleaned;
  let local: string;
  if (digits.startsWith('234') && digits.length === 13) {
    local = digits.slice(3);
  } else if (digits.startsWith('0') && digits.length === 11) {
    local = digits.slice(1);
  } else if (digits.length === 10 && /^[789]/.test(digits)) {
    local = digits;
  } else {
    return null;
  }
  if (!/^[789][01]\d{8}$/.test(local)) return null;
  return `+234${local}`;
}

export function isValidNgPhone(raw: string): boolean {
  return normalizeNgPhone(raw) !== null;
}
