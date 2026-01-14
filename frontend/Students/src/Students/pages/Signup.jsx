import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, GraduationCap, ShieldCheck, Loader2, ArrowRight } from "lucide-react";

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
      await axios.post("http://localhost:5000/api/auth/register", form);
      // Optional: Add a toast notification library here instead of alert
      alert("Signup successful"); 
      navigate("/");
    } catch {
      alert("User already exists");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-4">
      {/* Decorative background blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-300 text-sm">Join us and start your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-400 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500 transition-all"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Email Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-400 transition-colors" />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500 transition-all"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-400 transition-colors" />
            </div>
            <input
              type="password"
              placeholder="Create Password"
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500 transition-all"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {/* Role Selection - Visual Cards instead of Select Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">I am a:</label>
            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => setForm({ ...form, role: "student" })}
                className={`cursor-pointer p-3 rounded-lg border flex flex-col items-center justify-center transition-all ${
                  form.role === "student" 
                    ? "bg-indigo-600/20 border-indigo-500 text-white" 
                    : "bg-gray-800/50 border-gray-600 text-gray-400 hover:bg-gray-700/50"
                }`}
              >
                <GraduationCap className="h-6 w-6 mb-1" />
                <span className="text-sm font-medium">Student</span>
              </div>
              
              <div 
                onClick={() => setForm({ ...form, role: "admin" })}
                className={`cursor-pointer p-3 rounded-lg border flex flex-col items-center justify-center transition-all ${
                  form.role === "admin" 
                    ? "bg-purple-600/20 border-purple-500 text-white" 
                    : "bg-gray-800/50 border-gray-600 text-gray-400 hover:bg-gray-700/50"
                }`}
              >
                <ShieldCheck className="h-6 w-6 mb-1" />
                <span className="text-sm font-medium">Admin</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow-lg shadow-indigo-500/30 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Sign Up <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </form>

       
        <p className="text-center mt-6 text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold hover:underline transition-all">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}