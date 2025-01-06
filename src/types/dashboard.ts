export interface PetProfile {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  healthData: HealthData;
}

export interface HealthData {
  lastCheckup: string;
  vaccinations: Vaccination[];
  medications: Medication[];
}

export interface Vaccination {
  name: string;
  date: string;
  nextDue: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
}

export interface Appointment {
  id: string;
  serviceType: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  providerId: string;
  notes?: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  services: Service[];
  rating: number;
  reviews: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
}