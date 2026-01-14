import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // ✅ Import ToastContainer
import "react-toastify/dist/ReactToastify.css";  // ✅ Import Toast CSS

import Navbar from "./Students/components/Navbar";
import Footer from "./Students/components/Footer";

import Login from "./Students/pages/Login";
import Signup from "./Students/pages/Signup";

import Home from "./Students/pages/Home";
import Profile from "./Students/pages/Profile";
import AddComplaint from "./Students/pages/AddComplaints";
import MyComplaints from "./Students/pages/MyComplaints";
import AllComplaints from "./Students/pages/AllComplaints";

export const API_URL = import.meta.env.VITE_API_URL;

// 🔐 Protected Route for logged-in users
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

// 🧩 Layout wrapper
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
        theme="dark" // Matches your dark UI
      />

      <Layout>
        <Routes>
          {/* 🔓 Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 🔐 Student Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-complaint"
            element={
              <ProtectedRoute>
                <AddComplaint />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-complaints"
            element={
              <ProtectedRoute>
                <MyComplaints />
              </ProtectedRoute>
            }
          />
          
          <Route path="/complaints" element={<AllComplaints />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}