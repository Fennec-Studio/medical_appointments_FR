export interface Appointment {
  id: number;
  patient_id: number;
  doctor_id: number;
  date: Date;
  comments: string;
  status: number;
  created_at: Date;
  updated_at: Date;
  doctor: string;
  patient: string;
}
