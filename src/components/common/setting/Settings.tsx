import { motion } from 'framer-motion';
import { User, Bell, Shield, Palette } from 'lucide-react';

const Settings = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

      <div className="grid gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center space-x-4 mb-6">
            <User className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Account Settings</h2>
          </div>
          {/* Add account settings form */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center space-x-4 mb-6">
            <Bell className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Notifications</h2>
          </div>
          {/* Add notification settings */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center space-x-4 mb-6">
            <Shield className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Privacy & Security</h2>
          </div>
          {/* Add privacy settings */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center space-x-4 mb-6">
            <Palette className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Appearance</h2>
          </div>
          {/* Add appearance settings */}
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;