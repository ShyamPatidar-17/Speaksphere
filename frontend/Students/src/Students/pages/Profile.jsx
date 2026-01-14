import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, PlusCircle, List, Layers, LogOut, Mail, ShieldCheck } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    // ✅ Guard: nothing stored
    if (!storedUser || storedUser === "undefined") {
      localStorage.clear();
      navigate("/");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (err) {
      console.error("Corrupted user data");
      localStorage.clear();
      navigate("/");
    }
  }, [navigate]);

  if (!user) return null;

  const firstChar = user.name?.charAt(0)?.toUpperCase();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-4">
      {/* Decorative background blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Glass Card */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-white/5 p-8 text-center border-b border-white/10">
          <div className="relative inline-block group">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center text-4xl font-bold shadow-lg ring-4 ring-white/10 group-hover:ring-indigo-500/50 transition-all duration-300">
              {firstChar}
            </div>
            {/* Online Status Dot */}
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-gray-900 rounded-full"></div>
          </div>

          <h2 className="mt-4 text-2xl font-bold text-white tracking-wide">{user.name}</h2>
          
          <div className="flex items-center justify-center gap-2 mt-1 text-indigo-200 text-sm">
            <Mail className="w-4 h-4" />
            <span>{user.email}</span>
          </div>
          
          <div className="inline-flex items-center gap-1 mt-3 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-medium uppercase tracking-wider">
            <ShieldCheck className="w-3 h-3" />
            {user.role || "Student"} Account
          </div>
        </div>

        {/* Actions Section */}
        <div className="p-6 space-y-3">
          <button
            onClick={() => navigate("/add-complaint")}
            className="w-full group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/50 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 group-hover:text-white group-hover:bg-indigo-500 transition-colors">
                <PlusCircle className="w-5 h-5" />
              </div>
              <span className="text-gray-200 font-medium group-hover:text-white">File New Complaint</span>
            </div>
          </button>

          <button
            onClick={() => navigate("/my-complaints")}
            className="w-full group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/50 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:text-white group-hover:bg-emerald-500 transition-colors">
                <List className="w-5 h-5" />
              </div>
              <span className="text-gray-200 font-medium group-hover:text-white">My History</span>
            </div>
          </button>

          <button
            onClick={() => navigate("/complaints")}
            className="w-full group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 group-hover:text-white group-hover:bg-purple-500 transition-colors">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-gray-200 font-medium group-hover:text-white">Public Feed</span>
            </div>
          </button>

          <div className="pt-4 mt-2 border-t border-white/10">
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200 font-medium"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}