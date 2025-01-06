import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

const appointments = [
  {
    id: '1',
    service: 'Grooming',
    date: '2024-03-15',
    time: '14:00',
    provider: 'Happy Paws Salon',
    location: 'Downtown Branch',
    status: 'confirmed',
  },
  {
    id: '2',
    service: 'Checkup',
    date: '2024-03-20',
    time: '10:30',
    provider: 'Dr. Smith',
    location: 'Pet Care Clinic',
    status: 'pending',
  },
];

const Appointments = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Appointments</h1>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          Book New
        </button>
      </div>

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
                  {appointment.service}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{appointment.date}</span>
                    <Clock className="w-4 h-4 ml-4 mr-2" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <User className="w-4 h-4 mr-2" />
                    <span>{appointment.provider}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{appointment.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  appointment.status === 'confirmed' 
                    ? 'bg-green-500/10 text-green-400' 
                    : 'bg-yellow-500/10 text-yellow-400'
                }`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;