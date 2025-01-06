import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, Heart, AlertCircle } from 'lucide-react';

const notifications = [
  {
    id: '1',
    type: 'appointment',
    title: 'Upcoming Grooming Session',
    message: 'Your appointment is tomorrow at 2:00 PM',
    time: '1 hour ago',
    icon: Calendar,
    read: false,
  },
  {
    id: '2',
    type: 'health',
    title: 'Vaccination Due',
    message: 'Annual vaccination reminder for Max',
    time: '3 hours ago',
    icon: Heart,
    read: true,
  },
  {
    id: '3',
    type: 'alert',
    title: 'New Feature Available',
    message: 'Try our new AI-powered diet recommendations',
    time: '1 day ago',
    icon: AlertCircle,
    read: true,
  },
];

const Notifications = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Notifications</h1>
        <button className="text-gray-400 hover:text-white transition-colors">
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border ${
              notification.read
                ? 'bg-gray-800/30 border-gray-700'
                : 'bg-gray-800/50 border-purple-500/50'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-full ${
                notification.read ? 'bg-gray-700' : 'bg-purple-500/20'
              }`}>
                <notification.icon className={`w-5 h-5 ${
                  notification.read ? 'text-gray-400' : 'text-purple-400'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold">{notification.title}</h3>
                <p className="text-gray-400 mt-1">{notification.message}</p>
                <p className="text-sm text-gray-500 mt-2">{notification.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;