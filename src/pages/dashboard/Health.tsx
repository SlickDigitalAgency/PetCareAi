import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Syringe, Pill, Weight } from 'lucide-react';

const Health = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Health Monitoring</h1>

      <div className="grid gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { icon: Activity, label: 'Activity Level', value: 'High', trend: '+5%' },
            { icon: Weight, label: 'Weight', value: '30 kg', trend: 'Stable' },
            { icon: Syringe, label: 'Vaccinations', value: 'Up to date', trend: 'Next in 3m' },
            { icon: Pill, label: 'Medications', value: '2 Active', trend: 'Review needed' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center space-x-4">
                <stat.icon className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-white font-semibold mt-1">{stat.value}</p>
                  <p className="text-sm text-gray-400 mt-1">{stat.trend}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Health Timeline</h2>
          {/* Add health timeline content */}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Vaccination History</h2>
            {/* Add vaccination history content */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Medication Schedule</h2>
            {/* Add medication schedule content */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Health;