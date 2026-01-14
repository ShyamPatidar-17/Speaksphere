import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

// Context & Utils
import { ThemeProvider } from "./Context/ThemeContext";
import AdminRoute from "./components/AdminRoute";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import ManageComplaints from "./pages/ManageComplaints";
import Profile from "./pages/Profile";

// Global API URL
export const API_URL = import.meta.env.VITE_API_URL;


function Layout({ children }) {
  const location = useLocation();
  const hideLayout = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen theme-page transition-colors duration-300">
      {!hideLayout && <Navbar />}
      
     
      <main className="flex-grow">
        {children}
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
      
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <Layout>
          <Routes>
          
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

          
            <Route
              path="/"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            
            <Route
              path="/manage-complaints"
              element={
                <AdminRoute>
                  <ManageComplaints />
                </AdminRoute>
              }
            />
            
            <Route
              path="/profile"
              element={
                <AdminRoute>
                  <Profile />
                </AdminRoute>
              }
            />

            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}