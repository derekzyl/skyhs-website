export interface MockConsultant {
  id: string;
  name: string;
  title: string;
  specialty: string;
  subSpecialty: string;
  hospital: string;
  avatarUrl: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  fee: number;
  bio: string;
  credentials: string[];
  languages: string[];
  isAvailableNow: boolean;
  nextSlot: string;
  npiNumber: string;
  status: 'active' | 'pending' | 'suspended';
}

export interface MockPatientSession {
  id: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  mrn: string;
  chiefComplaint: string;
  scheduledTime: string;
  durationMinutes: number;
  status: 'waiting' | 'in_call' | 'completed' | 'scheduled';
  heartRate: number;
  spo2: number;
  bloodPressure: string;
  ecgRhythm: string;
  cptCode: string;
  avatarUrl: string;
}

export const MOCK_CONSULTANTS: MockConsultant[] = [
  {
    id: 'doc-1',
    name: 'Dr. Julian Vance, MD',
    title: 'Chief of Telecardiology',
    specialty: 'Cardiology',
    subSpecialty: 'Electrophysiology & Arrhythmia',
    hospital: 'St. Jude Heart & Vascular Institute',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
    rating: 4.96,
    reviewCount: 384,
    experienceYears: 16,
    fee: 140,
    bio: 'Board-certified in Clinical Cardiac Electrophysiology and Cardiovascular Disease. Pioneers wearable telemetry integration for sub-second arrhythmia detection and proactive atrial fibrillation intervention.',
    credentials: [
      'ABIM Board Certified in Cardiovascular Disease',
      'Fellow of the Heart Rhythm Society (FHRS)',
      'Harvard Medical School Postdoctoral Fellow',
    ],
    languages: ['English', 'French'],
    isAvailableNow: true,
    nextSlot: 'Today, 2:45 PM',
    npiNumber: '1892049102',
    status: 'active',
  },
  {
    id: 'doc-2',
    name: 'Dr. Sarah Lin, MD, PhD',
    title: 'Senior Clinical Endocrinologist',
    specialty: 'Endocrinology',
    subSpecialty: 'Metabolic Syndrome & CGM Telemetry',
    hospital: 'Johns Hopkins Medicine Center',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813637-44f2c002221b?w=400&q=80',
    rating: 4.92,
    reviewCount: 260,
    experienceYears: 12,
    fee: 130,
    bio: 'Specialist in endocrine disorders, continuous glucose telemetry correlation, and cardiovascular metabolic risk stratification.',
    credentials: [
      'American Board of Internal Medicine (Endocrinology)',
      'Clinical Investigator Award (Endocrine Society)',
      'Johns Hopkins Clinical Fellow',
    ],
    languages: ['English', 'Mandarin'],
    isAvailableNow: true,
    nextSlot: 'Today, 4:15 PM',
    npiNumber: '1903829104',
    status: 'active',
  },
  {
    id: 'doc-3',
    name: 'Dr. Anthony Adebayo, MBBS, FWACP',
    title: 'Consultant Internist & Preventative Lead',
    specialty: 'General Health',
    subSpecialty: 'Hypertension & Preventative Telehealth',
    hospital: 'Lagos University Teaching Hospital (LUTH)',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80',
    rating: 4.88,
    reviewCount: 412,
    experienceYears: 18,
    fee: 95,
    bio: 'Senior consultant physician focusing on ambulatory blood pressure optimization, remote lifestyle disease reversal, and real-time vital telemetry surveillance.',
    credentials: [
      'Fellow of the West African College of Physicians (FWACP)',
      'Royal College of Physicians (UK) Affiliate',
      'National Post-Graduate Medical College of Nigeria',
    ],
    languages: ['English', 'Yoruba'],
    isAvailableNow: false,
    nextSlot: 'Tomorrow, 10:00 AM',
    npiNumber: '1783940182',
    status: 'active',
  },
  {
    id: 'doc-4',
    name: 'Dr. Elena Rostova, MD',
    title: 'Neurologist & Sleep Medicine Director',
    specialty: 'Neurology',
    subSpecialty: 'Autonomic Nervous System & Sleep Cycles',
    hospital: 'Cleveland Clinic Neurological Institute',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
    rating: 4.94,
    reviewCount: 195,
    experienceYears: 14,
    fee: 160,
    bio: 'Expert in nocturnal heart rate variability, autonomic sleep architecture disruption, and circadian bio-rhythm restorative protocols.',
    credentials: [
      'American Board of Psychiatry and Neurology (ABPN)',
      'American Academy of Sleep Medicine Fellow',
    ],
    languages: ['English', 'German', 'Russian'],
    isAvailableNow: true,
    nextSlot: 'Today, 5:30 PM',
    npiNumber: '1492049183',
    status: 'active',
  },
  {
    id: 'doc-5',
    name: 'Dr. Marcus Brody, MD, FCCP',
    title: 'Chief of Pulmonary Telehealth',
    specialty: 'Pulmonology',
    subSpecialty: 'Asthma & Nocturnal SpO2 Tracking',
    hospital: 'Mass General Brigham Respiratory Unit',
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
    rating: 4.89,
    reviewCount: 178,
    experienceYears: 15,
    fee: 135,
    bio: 'Focused on remote respiratory volume monitoring, continuous nocturnal pulse oximetry, and acute bronchospasm prevention through wearable sensor data.',
    credentials: [
      'Fellow of the American College of Chest Physicians (FCCP)',
      'Board Certified Pulmonary & Critical Care Medicine',
    ],
    languages: ['English', 'Spanish'],
    isAvailableNow: false,
    nextSlot: 'Thursday, 11:30 AM',
    npiNumber: '1628394019',
    status: 'active',
  },
];

export const MOCK_PATIENT_QUEUE: MockPatientSession[] = [
  {
    id: 'sess-01',
    patientName: 'Eleanor Vance-Kovacs',
    patientAge: 64,
    patientGender: 'F',
    mrn: 'MRN #SK-94021',
    chiefComplaint: 'Sudden tachycardia episodes while climbing stairs (134 BPM recorded on Skyline Watch).',
    scheduledTime: '02:45 PM',
    durationMinutes: 20,
    status: 'waiting',
    heartRate: 104,
    spo2: 98,
    bloodPressure: '124/82 mmHg',
    ecgRhythm: 'Lead II Sinus (Mild Exertional Tachy)',
    cptCode: 'CPT 99214 + 99453',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
  },
  {
    id: 'sess-02',
    patientName: 'David K. Adeleke',
    patientAge: 52,
    patientGender: 'M',
    mrn: 'MRN #SK-88219',
    chiefComplaint: 'Monthly hypertension routine telemetry follow-up; review 14-day ambulatory diastolic readings.',
    scheduledTime: '03:15 PM',
    durationMinutes: 15,
    status: 'scheduled',
    heartRate: 72,
    spo2: 99,
    bloodPressure: '128/80 mmHg',
    ecgRhythm: 'Normal Sinus Rhythm',
    cptCode: 'CPT 99213',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    id: 'sess-03',
    patientName: 'Hannah Nguyen',
    patientAge: 39,
    patientGender: 'F',
    mrn: 'MRN #SK-77402',
    chiefComplaint: 'Post-viral fatigue and borderline low nocturnal SpO2 dips (91%).',
    scheduledTime: '04:00 PM',
    durationMinutes: 30,
    status: 'scheduled',
    heartRate: 84,
    spo2: 95,
    bloodPressure: '118/76 mmHg',
    ecgRhythm: 'Sinus Arrhythmia (Respirator-linked)',
    cptCode: 'CPT 99214',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
  },
];
