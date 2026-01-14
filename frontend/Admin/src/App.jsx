import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // ✅ Import ToastContainer
import "react-toastify/dist/ReactToastify.css";  // ✅ Import Toast CSS

import Navbar from "./Admin/components/Navbar";
import Footer from "./Admin/components/Footer";

import Login from "./Admin/pages/Login";
import Signup from "./Admin/pages/Signup";

import AdminDashboard from "./Admin/pages/AdminDashboard";
import ManageComplaints from "./Admin/pages/ManageComplaints";
import Profile from "./Admin/pages/Profile";

// Global API URL
export const API_URL = import.meta.env.VITE_API_URL;

// Layout wrapper (hide Navbar/Footer on login & signup)
function Layout({ children }) {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* ✅ Global Toast Configuration */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // Matches the dark Admin theme
      />

      <Layout>
        <Routes>
          {/* 🔓 Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 🛡️ Admin Pages */}
          <Route path="/" element={<AdminDashboard />} />
          
          <Route path="/managecomplaints" element={<ManageComplaints />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}