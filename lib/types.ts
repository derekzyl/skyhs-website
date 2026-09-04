export interface Consultant {
  id: string;
  user_id: string;
  display_name: string;
  title: string;
  specialty: string;
  sub_specialty?: string | null;
  hospital?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
  npi_number?: string | null;
  fee: number;
  experience_years: number;
  languages: string[];
  credentials: string[];
  status: string;
  accepts_telemetry: boolean;
  rating_avg: number;
  review_count: number;
  is_available_now?: boolean;
  next_available_slot?: string | null;
}

export interface ConsultationSession {
  id: string;
  patient_id: string;
  consultant_id: string;
  consultant_name?: string | null;
  consultant_title?: string | null;
  specialty?: string | null;
  consultant_avatar?: string | null;
  scheduled_at: string;
  duration_minutes: number;
  status: string;
  session_type: string;
  chief_complaint?: string | null;
  symptoms: string[];
  fee: number;
  payment_status: string;
  payment_reference?: string | null;
  payout_status: string;
  dispute_status?: string | null;
}

export interface AvailabilitySlot {
  id?: string;
  weekday: number;
  start_minute: number;
  end_minute: number;
  slot_minutes: number;
  is_active: boolean;
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  sender_id: string;
  body: string;
  sent_at: string;
}

export interface CareSummary {
  id?: string;
  session_id: string;
  diagnosis?: string | null;
  soap_notes?: string | null;
  prescriptions?: string | null;
  follow_up?: string | null;
}

export interface EarningsSummary {
  consultant_id: string;
  total_earned: number;
  pending_payout: number;
  paid_out: number;
  sessions: ConsultationSession[];
}

export interface AuthUser {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string | null;
  [key: string]: unknown;
}
