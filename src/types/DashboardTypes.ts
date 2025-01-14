import { AppointmentStatus, ServiceLocation } from './AppointmentTypes';

export interface GroomistService {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number; // in minutes
    availability: {
        days: string[];
        startTime: string;
        endTime: string;
    };
}

export interface AppointmentDetails {
    id: string;
    customerName: string;
    customerEmail: string;
    petName?: string;
    petType?: string;
    serviceId: string;
    serviceName: string;
    date: string;
    time: string;
    location: ServiceLocation;
    status: AppointmentStatus;
    specialInstructions?: string;
}

export interface GroomistDashboardStats {
    totalAppointments: number;
    completedAppointments: number;
    cancelledAppointments: number;
    totalRevenue: number;
    averageRating: number;
    upcomingAppointments: AppointmentDetails[];
    recentReviews: {
        customerName: string;
        rating: number;
        comment: string;
        date: string;
    }[];
}

export interface GroomistProfile {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    businessName?: string;
    bio?: string;
    profileImageUrl?: string;
    serviceLocations: ServiceLocation[];
    businessHours: {
        [day: string]: {
            open: string;
            close: string;
            isOpen: boolean
        };
    };
}

export type GroomistDashboardSection =
    | 'overview'
    | 'appointments'
    | 'services'
    | 'profile'
    | 'earnings';