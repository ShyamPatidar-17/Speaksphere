import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, GraduationCap, ShieldCheck, Loader2, ArrowRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "../App"; 
import "../style.css"; // ✅ Import Theme Styles

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
    
    // Basic validation
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${API_URL}/api/auth/register`, form);
      toast.success("Account created successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(error.response?.data?.message || "User already exists or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    // STRUCTURE: Tailwind | COLOR: theme-page
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300 theme-page">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[100px] animate-pulse theme-blob"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[100px] animate-pulse delay-1000 theme-blob"></div>

      {/* Main Glass Card */}
      <div className="backdrop-blur-2xl p-8 rounded-3xl w-full max-w-md relative z-10 transition-all duration-300 theme-card">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 shadow-lg theme-btn-gradient">
            <User className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight theme-text-main">Create Account</h2>
          <p className="text-sm mt-2 theme-text-sub">Join our learning community today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 transition-colors duration-300 theme-text-sub group-focus-within:text-indigo-500" />
            </div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl transition-all duration-300 theme-input"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Email Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 transition-colors duration-300 theme-text-sub group-focus-within:text-indigo-500" />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl transition-all duration-300 theme-input"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 transition-colors duration-300 theme-text-sub group-focus-within:text-indigo-500" />
            </div>
            <input
              type="password"
              placeholder="Create Password"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl transition-all duration-300 theme-input"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider mb-3 ml-1 theme-text-sub">Select Role</label>
            <div className="grid grid-cols-2 gap-4">
              
              {/* Student Role */}
              <div 
                onClick={() => setForm({ ...form, role: "student" })}
                className={`relative cursor-pointer p-4 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 group overflow-hidden ${
                  form.role === "student" 
                    ? "border-indigo-500 theme-accent-indigo-soft theme-accent-indigo-text shadow-md" 
                    : "theme-input hover:border-indigo-500/50 theme-text-sub"
                }`}
              >
                <GraduationCap className={`h-7 w-7 mb-2 transition-transform duration-300 ${form.role === "student" ? "scale-110" : "group-hover:scale-110"}`} />
                <span className="text-sm font-semibold z-10">Student</span>
              </div>
              
              {/* Admin Role */}
              <div 
                onClick={() => setForm({ ...form, role: "admin" })}
                className={`relative cursor-pointer p-4 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 group overflow-hidden ${
                  form.role === "admin" 
                    ? "border-purple-500 theme-accent-purple-soft theme-accent-purple-text shadow-md" 
                    : "theme-input hover:border-purple-500/50 theme-text-sub"
                }`}
              >
                <ShieldCheck className={`h-7 w-7 mb-2 transition-transform duration-300 ${form.role === "admin" ? "scale-110" : "group-hover:scale-110"}`} />
                <span className="text-sm font-semibold z-10">Admin</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group theme-btn-gradient"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Create Account 
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-8 text-sm theme-text-sub">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold hover:underline transition-all theme-link">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}