import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { API_URL } from "../App";
import "../style.css"; // ✅ Import Theme Styles

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Welcome back! 👋");

      if (res.data.user.role === "admin") {
        window.location.href = "http://localhost:5174/";
      } else {
        navigate("/home");
      }

    } catch (err) {
      toast.error(err.response?.data?.msg || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Structure: Tailwind | Color: theme-page
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300 theme-page">
      <Toaster position="top-center" />
      
      {/* Decorative background blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl animate-blob theme-blob"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full blur-3xl animate-blob animation-delay-2000 theme-blob"></div>

      {/* Main Card */}
      <div className="backdrop-blur-xl p-8 rounded-3xl w-full max-w-md relative z-10 theme-card">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 theme-text-main">Welcome Back</h2>
          <p className="text-sm theme-text-sub">Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Email Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 transition-colors theme-text-sub group-focus-within:text-indigo-500" />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-xl transition-all theme-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 transition-colors theme-text-sub group-focus-within:text-indigo-500" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-12 py-3 rounded-xl transition-all theme-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none transition-colors theme-text-sub hover:text-indigo-500"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 theme-btn-gradient"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                Login <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-6 text-sm theme-text-sub">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold hover:underline transition-all theme-link">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}