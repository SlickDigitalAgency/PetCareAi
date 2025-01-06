import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/common/dashboard/Sidebar';
import Overview from './Overview';
import Appointments from './Appointments';
import PetProfile from './PetProfile';
import Health from './Health';
import Notifications from './Notifications';
import Settings from './Settings';

const CustomerDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/profile" element={<PetProfile />} />
          <Route path="/health" element={<Health />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
};

export default CustomerDashboard;