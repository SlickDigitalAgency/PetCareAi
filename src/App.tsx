import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/navbar/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgetPassword from "./pages/auth/ForgetPassword";
import CustomerDashboard from "./pages/dashboard/customer/CustomerDashboard";
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import GroomistDashboard from "./pages/dashboard/serviceProvider/GroomistDashboard";
import DoctorDashboard from "./pages/dashboard/serviceProvider/DoctorDashboard";
import { auth } from "./firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

function App() {
  const [user, loading] = useAuthState(auth);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const db = getFirestore();
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.role || null);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        } finally {
          setRoleLoading(false);
        }
      } else {
        setRoleLoading(false);
      }
    };

    if (user) {
      fetchUserRole();
    } else {
      setRoleLoading(false);
    }
  }, [user]); // Added user as a dependency to trigger the effect only when user changes

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (userRole) {
      case "customer":
        return <CustomerDashboard />;
      case "groomist":
        return <GroomistDashboard />;
      case "doctor":
        return <DoctorDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <Navigate to="/login" />;
    }
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900">
        {!user && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={!user ? <Home /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/forgot-password"
            element={!user ? <ForgetPassword /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/dashboard/*"
            element={user ? renderDashboard() : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
