import { Routes, Route } from "react-router-dom";
import Sidebar from "../../../components/common/dashboard/Sidebar";
import Overview from "../../../components/sections/dashboard/Overview";
import Appointments from "../../../components/sections/dashboard/Appointments";
import PetProfile from "../../../components/sections/dashboard/PetProfile";
import Health from "../../../components/sections/dashboard/Health";
import Notifications from "../../../components/common/notification/Notifications";
import Settings from "../../../components/common/setting/Settings";
import { CustomerMenuItems } from "../../../constantData/SidebarData";

const CustomerDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-900">
      {/* Pass CustomerMenuItems as a prop */}
      <Sidebar menuItems={CustomerMenuItems} />
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
