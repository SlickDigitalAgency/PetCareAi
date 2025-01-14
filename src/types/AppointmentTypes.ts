export enum AppointmentStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled'
}

export interface FirebaseAppointment extends AppointmentFormData {
    id: string;
    status: AppointmentStatus;
    createdAt: any; // Firebase Timestamp
    userId: string;
}

export enum AppointmentType {
    GROOMIST = 'GROOMIST',
    DOCTOR = 'DOCTOR'
}

export enum ServiceLocation {
    AT_YOUR_PLACE = 'AT_YOUR_PLACE',
    AT_PROVIDER_PLACE = 'AT_PROVIDER_PLACE'
}

export interface ServiceProvider {
    id: string;
    name: string;
    type: AppointmentType;
    rating: number;
    reviews: number;
    offersHomeVisit: boolean;
    availability: {
        [key: string]: string[]; // date -> available time slots
    };
}

export interface PetDetails {
    name: string;
    type: string;
    breed: string;
}

export interface AppointmentFormData {
    appointmentType: AppointmentType;
    serviceLocation: ServiceLocation;
    serviceProvider?: ServiceProvider;
    appointmentDate?: string;
    appointmentTime?: string;
    specialInstructions?: string;
    customerName?: string;
    petDetails?: PetDetails;
}

export type AppointmentStep =
    | 'appointment-type'
    | 'service-location'
    | 'service-provider'
    | 'schedule'
    | 'confirm';