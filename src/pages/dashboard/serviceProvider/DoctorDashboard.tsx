import { Route, Routes } from "react-router-dom";
import Sidebar from "../../../components/common/dashboard/Sidebar";

import Overview from "../../../components/sections/dashboard/Overview";
const DoctorDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Overview />} />
        </Routes>
      </main>
    </div>
  );
};

export default DoctorDashboard;
