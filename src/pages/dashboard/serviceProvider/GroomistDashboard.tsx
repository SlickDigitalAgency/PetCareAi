

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/config';
import {
    BarChart2,
    Calendar,
    User,
    DollarSign,
    Scissors
} from 'lucide-react';
import { GroomistDashboardSection } from '../../../types/DashboardTypes';

const GroomistDashboard = () => {
    const [user] = useAuthState(auth);
    const [currentSection, setCurrentSection] = useState<GroomistDashboardSection>('overview');

    const navigationItems = [
        { id: 'overview', label: 'Overview', icon: BarChart2 },
        { id: 'appointments', label: 'Appointments', icon: Calendar },
        { id: 'services', label: 'Services', icon: Scissors },
        { id: 'earnings', label: 'Earnings', icon: DollarSign },
        { id: 'profile', label: 'Profile', icon: User },
    ];

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-gray-400">Please sign in to access your dashboard.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-gray-800/50 backdrop-blur-sm min-h-screen border-r border-gray-700">
                    <div className="p-4">
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                                <User className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-white">
                                    {user.displayName || 'Groomist'}
                                </h2>
                                <p className="text-sm text-gray-400">Service Provider</p>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            {navigationItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setCurrentSection(item.id as GroomistDashboardSection)}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${currentSection === item.id
                                        ? 'bg-purple-600 text-white'
                                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                                        }`}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                    <motion.div
                        key={currentSection}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="h-full"
                    >
                        {/* Section content will be implemented in subsequent steps */}
                        <div className="text-white">
                            {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} Section
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default GroomistDashboard;