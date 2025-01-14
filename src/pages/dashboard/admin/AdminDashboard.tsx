import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/config";
import { AdminSection } from "../../../types/SidebarDataTypes";
import { AdminNavigationItems } from "../../../constantData/SidebarData";
import Sidebar from "../../../components/common/dashboard/Sidebar";

const AdminDashboard = () => {
  const [user] = useAuthState(auth);
  const [currentSection, setCurrentSection] =
    useState<AdminSection>("overview");

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-gray-400">
          Please sign in to access the admin dashboard.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex">
        {/* Pass currentSection and setCurrentSection as props */}
        <Sidebar
          menuItems={AdminNavigationItems}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full"
          >
            <div className="text-white">
              {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}{" "}
              Section
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
