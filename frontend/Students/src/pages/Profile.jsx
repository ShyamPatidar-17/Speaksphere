import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  User, PlusCircle, List, Layers, LogOut, Mail, ShieldCheck,
  FileText, CheckCircle, Clock, XCircle, Loader2
} from "lucide-react";
import { API_URL } from "../App";
import "../style.css"; 

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0, rejected: 0 });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || storedUser === "undefined") {
      localStorage.clear();
      navigate("/");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchStats(parsedUser);
    } catch (err) {
      console.error("Corrupted user data");
      localStorage.clear();
      navigate("/");
    }
  }, [navigate]);

  const fetchStats = async (currentUser) => {
    try {
      const res = await axios.get(`${API_URL}/api/complaints`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });

      // Filter complaints for this user
      const myComplaints = res.data.filter((c) => c.user?._id === currentUser?.id || c.user === currentUser?.id);

      // Calculate counts
      const counts = myComplaints.reduce(
        (acc, curr) => {
          acc.total++;
          const status = curr.status.toLowerCase();
          if (acc[status] !== undefined) acc[status]++;
          return acc;
        },
        { total: 0, pending: 0, resolved: 0, rejected: 0 }
      );

      setStats(counts);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const firstChar = user.name?.charAt(0)?.toUpperCase();

  return (
    // STRUCTURE: Tailwind | COLOR: theme-page
    <div className="min-h-screen flex items-center justify-center theme-page p-4 md:p-8 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Blobs */}
      <div className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl animate-blob theme-blob"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-blob animation-delay-2000 theme-blob"></div>

      {/* Main Container - Expanded Width */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        
        {/* --- LEFT COLUMN: PROFILE INFO & ACTIONS --- */}
        <div className="md:col-span-1 theme-card backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden flex flex-col h-full">
          
          {/* Header */}
          <div className="p-8 text-center border-b border-gray-500/10">
            <div className="relative inline-block group">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center text-4xl font-bold shadow-lg ring-4 ring-gray-500/20 group-hover:ring-indigo-500/50 transition-all duration-300">
                {firstChar}
              </div>
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-4 border-white dark:border-slate-800 rounded-full"></div>
            </div>

            <h2 className="mt-4 text-2xl font-bold theme-text-main tracking-wide">{user.name}</h2>
            
            <div className="flex items-center justify-center gap-2 mt-1 theme-text-sub text-sm">
              <Mail className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
            
            <div className="inline-flex items-center gap-1 mt-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider theme-accent-indigo-soft theme-accent-indigo-text">
              <ShieldCheck className="w-3 h-3" />
              {user.role || "Student"}
            </div>
          </div>

          {/* Menu Actions */}
          <div className="p-6 space-y-3 flex-1 flex flex-col justify-center">
            <button onClick={() => navigate("/add-complaint")} className="w-full group flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-blue-500/30 hover:bg-blue-500/5 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg transition-colors theme-accent-blue-soft theme-accent-blue-text group-hover:bg-blue-500 group-hover:text-white"><PlusCircle className="w-5 h-5" /></div>
                <span className="theme-text-main font-medium group-hover:text-blue-500">New Complaint</span>
              </div>
            </button>

            <button onClick={() => navigate("/my-complaints")} className="w-full group flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg transition-colors theme-accent-indigo-soft theme-accent-indigo-text group-hover:bg-indigo-500 group-hover:text-white"><List className="w-5 h-5" /></div>
                <span className="theme-text-main font-medium group-hover:text-indigo-500">My History</span>
              </div>
            </button>

            <button onClick={() => navigate("/complaints")} className="w-full group flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-purple-500/30 hover:bg-purple-500/5 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg transition-colors theme-accent-purple-soft theme-accent-purple-text group-hover:bg-purple-500 group-hover:text-white"><Layers className="w-5 h-5" /></div>
                <span className="theme-text-main font-medium group-hover:text-purple-500">Public Feed</span>
              </div>
            </button>
          </div>

          <div className="p-6 pt-0 mt-auto">
            <button
              onClick={() => { localStorage.clear(); navigate("/"); }}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl font-medium transition-all bg-red-50 text-red-600 hover:bg-red-500 hover:text-white dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-600"
            >
              <LogOut className="w-5 h-5" /> Sign Out
            </button>
          </div>
        </div>

        {/* --- RIGHT COLUMN: STATS DASHBOARD --- */}
        <div className="md:col-span-2 flex flex-col gap-6">
          
          {/* Welcome Banner */}
          <div className="theme-card p-8 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl font-extrabold theme-text-main mb-2">Complaint <span className="theme-hero-name">Overview</span></h1>
              <p className="theme-text-sub max-w-lg">Here is a quick summary of all the grievances you have raised on the platform.</p>
            </div>
            <div className="absolute right-0 top-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          </div>

          {/* 2x2 Grid */}
          {loading ? (
             <div className="flex-1 flex items-center justify-center theme-card rounded-3xl min-h-[300px]">
               <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              
              {/* 1. TOTAL */}
              <div className="theme-card p-6 rounded-2xl flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 border-l-4 border-indigo-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="theme-text-sub text-sm font-semibold uppercase tracking-wider">Total Raised</p>
                    <h3 className="text-4xl font-black theme-text-main mt-2">{stats.total}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500">
                    <FileText className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-4 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-full"></div>
                </div>
              </div>

              {/* 2. RESOLVED */}
              <div className="card-resolved p-6 rounded-2xl flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold uppercase tracking-wider">Resolved</p>
                    <h3 className="text-4xl font-black text-emerald-700 dark:text-emerald-300 mt-2">{stats.resolved}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-white/50 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 mt-4 font-medium">Successfully closed</p>
              </div>

              {/* 3. PENDING */}
              <div className="card-pending p-6 rounded-2xl flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-amber-600 dark:text-amber-400 text-sm font-semibold uppercase tracking-wider">Pending</p>
                    <h3 className="text-4xl font-black text-amber-700 dark:text-amber-300 mt-2">{stats.pending}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-white/50 text-amber-600 dark:text-amber-400">
                    <Clock className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-xs text-amber-600/70 dark:text-amber-400/70 mt-4 font-medium">In progress or review</p>
              </div>

              {/* 4. REJECTED */}
              <div className="card-rejected p-6 rounded-2xl flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-red-600 dark:text-red-400 text-sm font-semibold uppercase tracking-wider">Rejected</p>
                    <h3 className="text-4xl font-black text-red-700 dark:text-red-300 mt-2">{stats.rejected}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-white/50 text-red-600 dark:text-red-400">
                    <XCircle className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-xs text-red-600/70 dark:text-red-400/70 mt-4 font-medium">Closed without action</p>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}