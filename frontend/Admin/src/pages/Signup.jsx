import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { User, Mail, Lock, ShieldCheck, Loader2, ArrowRight } from "lucide-react";
import { API_URL } from "../App";
import "../Style.css"; 

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", 
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/auth/register`, form);
      toast.success("Account created successfully!");
      // Redirect to login after a short delay
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.msg || "User already exists");
    } finally {
      setLoading(false);
    }
  };

  return (
    // STRUCTURE: Tailwind | COLOR: admin-page (from CSS)
    <div className="min-h-screen flex items-center justify-center p-4 admin-page">
      <Toaster position="top-right" />

      {/* Card Container */}
      <div className="admin-card p-8 rounded-2xl shadow-xl w-full max-w-md relative z-10 border border-gray-200 dark:border-gray-700">
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg mx-auto mb-4">
            A
          </div>
          <h2 className="text-2xl font-bold text-main">Create Account</h2>
          <p className="text-sm text-sub mt-2">Join the SpeakSphere administrative platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-sub" />
            </div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 rounded-lg admin-input"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-sub" />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-lg admin-input"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-sub" />
            </div>
            <input
              type="password"
              placeholder="Create Password"
              className="w-full pl-10 pr-4 py-3 rounded-lg admin-input"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {/* Role Selection */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ShieldCheck className="h-5 w-5 text-sub" />
            </div>
            <select
              className="w-full pl-10 pr-4 py-3 rounded-lg admin-input appearance-none cursor-pointer"
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              defaultValue="student"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
            {/* Custom Arrow Icon */}
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-sub">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 btn-admin-gradient disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Create Account <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>

          <p className="text-center mt-6 text-sm text-sub">
            Already registered?{" "}
            <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}