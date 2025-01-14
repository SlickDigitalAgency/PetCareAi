import {
    addDoc,
    collection,
    getFirestore,
    serverTimestamp,
    query,
    where,
    orderBy,
    getDocs,
    updateDoc,
    doc
} from 'firebase/firestore';
import { AppointmentFormData, AppointmentStatus, FirebaseAppointment } from '../types/AppointmentTypes';

const db = getFirestore();

export const createAppointment = async (
    appointmentData: AppointmentFormData,
    userId: string
): Promise<string> => {
    try {
        const appointmentsRef = collection(db, 'appointments');
        const appointment = {
            ...appointmentData,
            status: AppointmentStatus.PENDING,
            createdAt: serverTimestamp(),
            userId,
        };


        const docRef = await addDoc(appointmentsRef, appointment);
        return docRef.id;
    } catch (error) {
        console.error('Error creating appointment:', error);
        throw new Error('Failed to create appointment');
    }
};

export const getAppointments = async (userId: string): Promise<FirebaseAppointment[]> => {
    try {
        const appointmentsRef = collection(db, 'appointments');
        const q = query(
            appointmentsRef,
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as FirebaseAppointment[];
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw new Error('Failed to fetch appointments');
    }
};

export const updateAppointmentStatus = async (
    appointmentId: string,
    status: AppointmentStatus
): Promise<void> => {
    try {
        const appointmentRef = doc(db, 'appointments', appointmentId);
        await updateDoc(appointmentRef, { status });
    } catch (error) {
        console.error('Error updating appointment status:', error);
        throw new Error('Failed to update appointment status');
    }
};