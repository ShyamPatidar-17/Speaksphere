import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast"; 
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { API_URL } from "../App";
import "../Style.css"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      // ✅ Store token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Welcome back, Admin!");
      
      // Redirect to dashboard
      setTimeout(() => navigate("/"), 800);
      
    } catch (err) {
      toast.error(err.response?.data?.msg || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    // STRUCTURE: Tailwind | COLOR: admin-page (from adminStyle.css)
    <div className="min-h-screen flex items-center justify-center p-4 admin-page">
      <Toaster position="top-right" />
      
      {/* Card Container */}
      <div className="admin-card p-8 rounded-2xl shadow-xl w-full max-w-md relative z-10 border border-gray-200 dark:border-gray-700">
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg mx-auto mb-4">
            A
          </div>
          <h2 className="text-2xl font-bold text-main">Admin Login</h2>
          <p className="text-sm text-sub mt-2">Sign in to manage the SpeakSphere platform</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-sub" />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-lg admin-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-sub" />
            </div>
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-lg admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
                Login to Dashboard <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>

          <p className="text-center mt-6 text-sm text-sub">
            Not an admin?{" "}
            <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              Request Access
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}