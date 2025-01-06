import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Edit2 } from 'lucide-react';

const PetProfile = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Pet Profile</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-1"
        >
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="relative mb-6">
              <img
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1"
                alt="Pet"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button className="absolute bottom-4 right-4 p-2 bg-gray-900/80 rounded-full text-white hover:bg-gray-900">
                <Camera className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Name
                </label>
                <p className="text-white">Max</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Breed
                </label>
                <p className="text-white">Golden Retriever</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Age
                </label>
                <p className="text-white">3 years</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Weight
                </label>
                <p className="text-white">30 kg</p>
              </div>
            </div>

            <button className="mt-6 w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Edit2 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2"
        >
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-6">Health Records</h2>
            {/* Add health records content */}
          </div>

          <div className="mt-8 bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-6">Care Instructions</h2>
            {/* Add care instructions content */}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PetProfile;