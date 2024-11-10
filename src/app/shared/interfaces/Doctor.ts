export interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  speciality_id: number;
  room: number;
  email: string;
  password: string;
  phone: string;
  license: string;
  created_at: Date;
  updated_at: Date;
  speciality?: string;
}

interface Speciality {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}
