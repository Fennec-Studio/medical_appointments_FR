export interface Patient {
  id: number;
  curp: string;
  first_name: string;
  last_name: string;
  birthdate: Date;
  email: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
  medical_history?: MedicalHistory;
}

export interface MedicalHistory {
  id: number;
  patient_id: number;
  age: number;
  gender: string;
  height: number;
  weight: number;
  blood_type: string;
  allergies: string;
  medications: string;
  created_at: string;
  updated_at: string;


}
