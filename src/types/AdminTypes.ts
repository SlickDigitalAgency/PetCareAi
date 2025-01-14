import { AppointmentStatus, AppointmentType, ServiceLocation } from './AppointmentTypes';

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'customer' | 'groomist' | 'doctor';
    status: 'active' | 'suspended';
    createdAt: Date;
    lastLogin: Date;
}

export interface AdminAppointment {
    id: string;
    customerId: string;
    customerName: string;
    providerId: string;
    providerName: string;
    serviceType: AppointmentType;
    status: AppointmentStatus;
    location: ServiceLocation;
    date: string;
    time: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AdminService {
    id: string;
    name: string;
    type: AppointmentType;
    description: string;
    price: number;
    availability: {
        locations: ServiceLocation[];
        schedule: {
            [key: string]: string[]; // day -> available hours
        };
    };
    active: boolean;
}

export interface AdminMetrics {
    totalUsers: number;
    activeUsers: number;
    totalAppointments: number;
    completedAppointments: number;
    cancelledAppointments: number;
    revenue: number;
    userGrowth: {
        [key: string]: number; // date -> count
    };
    appointmentTrends: {
        [key: string]: number; // date -> count
    };
}

export interface AdminLog {
    id: string;
    adminId: string;
    adminName: string;
    action: string;
    details: string;
    timestamp: Date;
}

export interface AdminSettings {
    theme: 'light' | 'dark';
    notifications: {
        email: boolean;
        push: boolean;
        sms: boolean;
    };
    security: {
        twoFactorAuth: boolean;
        sessionTimeout: number;
    };
}

export type AdminSection =
    | 'overview'
    | 'users'
    | 'appointments'
    | 'services'
    | 'analytics'
    | 'settings'
    | 'logs';