import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/config';
import { collection, query, where, orderBy, onSnapshot, getFirestore } from 'firebase/firestore';
import AppointmentBookingForm from '../../common/form/AppointmentBookingForm';
import { FirebaseAppointment, AppointmentStatus } from '../../../types/AppointmentTypes';


const getStatusStyles = (status: AppointmentStatus) => {
  switch (status) {
    case AppointmentStatus.CONFIRMED:
      return 'bg-green-500/10 text-green-400';
    case AppointmentStatus.CANCELLED:
      return 'bg-red-500/10 text-red-400';
    default:
      return 'bg-yellow-500/10 text-yellow-400';
  }
};

const Appointments = () => {
  const [user] = useAuthState(auth);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<FirebaseAppointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setAppointments([]);
      setIsLoading(false);
      return;
    }

    const db = getFirestore();
    const appointmentsRef = collection(db, 'appointments');
    const q = query(
      appointmentsRef,
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const appointmentsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FirebaseAppointment[];

      setAppointments(appointmentsList);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleBookingComplete = () => {
    setIsBookingModalOpen(false);
  };

  if (!user) {
    return (
      <div className="p-8 text-center text-gray-400">
        Please sign in to view and book appointments.
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Appointments</h1>
        <button
          onClick={() => setIsBookingModalOpen(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Book Now
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          No appointments found. Book your first appointment now!
        </div>
      ) : (
        <div className="grid gap-6">
          {appointments.map((appointment) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {appointment.appointmentType}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{appointment.appointmentDate}</span>
                      <Clock className="w-4 h-4 ml-4 mr-2" />
                      <span>{appointment.appointmentTime}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <User className="w-4 h-4 mr-2" />
                      <span>{appointment.serviceProvider?.name}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{appointment.serviceLocation}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusStyles(appointment.status as AppointmentStatus)}`}
                  >

                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AppointmentBookingForm
        isOpen={isBookingModalOpen}
        onClose={handleBookingComplete}
        userData={{
          name: user.displayName || '',
          // You would typically get this from a user profile in Firestore
          petDetails: {
            name: "",
            type: "",
            breed: ""
          }
        }}
      />
    </div>
  );
};

export default Appointments;