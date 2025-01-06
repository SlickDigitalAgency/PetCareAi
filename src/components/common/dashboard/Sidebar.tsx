import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Calendar,
  User,
  Heart,
  Bell,
  Settings,
  LogOut,
} from 'lucide-react';
import { logOut } from '../../../firebase/auth';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { icon: Calendar, label: 'Appointments', path: '/dashboard/appointments' },
  { icon: User, label: 'Pet Profile', path: '/dashboard/profile' },
  { icon: Heart, label: 'Health', path: '/dashboard/health' },
  { icon: Bell, label: 'Notifications', path: '/dashboard/notifications' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

const Sidebar = () => {
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logOut();
      // Redirect will be handled by the auth state listener
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="h-screen w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          PetCare.AI
        </h2>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-purple-500/10 text-purple-400'
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 w-1 h-8 bg-purple-500 rounded-r-full"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-2.5 w-full rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
export default Sidebar;