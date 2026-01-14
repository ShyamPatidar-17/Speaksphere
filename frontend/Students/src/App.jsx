import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";  

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AddComplaint from "./pages/AddComplaints";
import MyComplaints from "./pages/MyComplaints";
import AllComplaints from "./pages/AllComplaints";

import { ThemeProvider } from "./context/ThemeContext";

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
    <ThemeProvider>
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
    </ThemeProvider>
  );
}