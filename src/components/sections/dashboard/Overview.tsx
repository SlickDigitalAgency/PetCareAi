
import { motion } from 'framer-motion';
import { Calendar, Heart, Bell, Clock } from 'lucide-react';

const Overview = () => {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Alex</h1>
        <p className="text-gray-400">Here's what's happening with your pet today</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Calendar, label: 'Next Appointment', value: 'Tomorrow, 2:00 PM', color: 'text-blue-400' },
          { icon: Heart, label: 'Health Status', value: 'Excellent', color: 'text-green-400' },
          { icon: Bell, label: 'Reminders', value: '2 New', color: 'text-yellow-400' },
          { icon: Clock, label: 'Last Checkup', value: '2 weeks ago', color: 'text-purple-400' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center space-x-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-white font-semibold mt-1">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add more dashboard sections here */}
    </div>
  );
};

export default Overview;