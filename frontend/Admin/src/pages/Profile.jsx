import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  User, PlusCircle, LayoutDashboard, LogOut, Mail, ShieldCheck, 
  CheckCircle, XCircle, Clock, FileText, Loader2 
} from "lucide-react";
import { API_URL } from "../App";
import "../Style.css";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    rejected: 0
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    // Guard: Check if user exists
    if (!storedUser || storedUser === "undefined") {
      localStorage.clear();
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchStats();
    } catch (err) {
      console.error("Corrupted user data");
      localStorage.clear();
      navigate("/login");
    }
  }, [navigate]);

  // Fetch Complaint Stats
  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/complaints`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      
      const data = res.data;
      setStats({
        total: data.length,
        pending: data.filter(c => c.status === 'pending').length,
        resolved: data.filter(c => c.status === 'resolved').length,
        rejected: data.filter(c => c.status === 'rejected').length
      });
    } catch (error) {
      console.error("Error fetching stats", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const firstChar = user.name?.charAt(0)?.toUpperCase();

  return (
    // STRUCTURE: Tailwind | COLOR: admin-page
    <div className="min-h-screen p-6 md:p-10 admin-page flex items-center justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: Admin Profile & Actions --- */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="admin-card p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 h-full">
            
            {/* Header */}
            <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-8 mb-8">
              <div className="relative inline-block group mb-4">
                <div className="w-24 h-24 mx-auto rounded-full bg-indigo-600 text-white flex items-center justify-center text-4xl font-bold shadow-xl ring-4 ring-indigo-100 dark:ring-indigo-900 transition-transform duration-300 group-hover:scale-105">
                  {firstChar}
                </div>
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white dark:border-gray-800 rounded-full"></div>
              </div>

              <h2 className="text-2xl font-bold text-main">{user.name}</h2>
              
              <div className="flex items-center justify-center gap-2 mt-2 text-sub text-sm">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              
              <div className="inline-flex items-center gap-1 mt-4 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3" />
                Administrator
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="space-y-3">
              <button
                onClick={() => navigate("/manage-complaints")}
                className="w-full flex items-center gap-3 p-4 rounded-xl transition-all hover:bg-indigo-50 dark:hover:bg-indigo-900/20 group border border-transparent hover:border-indigo-100 dark:hover:border-indigo-800"
              >
                <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <span className="text-main font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Manage Complaints</span>
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full flex items-center gap-3 p-4 rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-gray-800 group border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
              >
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-gray-700 group-hover:text-white transition-colors">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                <span className="text-main font-semibold">Dashboard Home</span>
              </button>

              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
                className="w-full flex items-center gap-3 p-4 rounded-xl transition-all hover:bg-red-50 dark:hover:bg-red-900/20 group border border-transparent hover:border-red-100 dark:hover:border-red-900/50 mt-4"
              >
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <LogOut className="w-5 h-5" />
                </div>
                <span className="text-red-600 dark:text-red-400 font-bold">Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Statistics Grid --- */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="mb-2">
            <h1 className="text-3xl font-bold text-main">Overview Stats</h1>
            <p className="text-sub mt-1">Real-time summary of platform activity.</p>
          </div>

          {loading ? (
             <div className="flex-1 flex items-center justify-center h-64 admin-card rounded-2xl">
               <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
              
              {/* 1. Total Complaints */}
              <div className="admin-card p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border-l-4 border-indigo-500 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sub text-xs font-bold uppercase tracking-wider">Total Raised</p>
                    <h3 className="text-4xl font-black text-main mt-2">{stats.total}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                    <FileText className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-4 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  All time records
                </div>
              </div>

              {/* 2. Resolved */}
              <div className="p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                   style={{ backgroundColor: 'var(--status-resolved-bg)', border: '1px solid var(--status-resolved-border)' }}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--status-resolved-text)' }}>Resolved</p>
                    <h3 className="text-4xl font-black mt-2" style={{ color: 'var(--status-resolved-text)' }}>{stats.resolved}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-white/40 dark:bg-black/10" style={{ color: 'var(--status-resolved-text)' }}>
                    <CheckCircle className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-4 text-xs font-bold opacity-80" style={{ color: 'var(--status-resolved-text)' }}>
                  Successfully closed
                </div>
              </div>

              {/* 3. Pending */}
              <div className="p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                   style={{ backgroundColor: 'var(--status-pending-bg)', border: '1px solid var(--status-pending-border)' }}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--status-pending-text)' }}>Pending</p>
                    <h3 className="text-4xl font-black mt-2" style={{ color: 'var(--status-pending-text)' }}>{stats.pending}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-white/40 dark:bg-black/10" style={{ color: 'var(--status-pending-text)' }}>
                    <Clock className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-4 text-xs font-bold opacity-80" style={{ color: 'var(--status-pending-text)' }}>
                  Awaiting action
                </div>
              </div>

              {/* 4. Rejected */}
              <div className="p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                   style={{ backgroundColor: 'var(--status-rejected-bg)', border: '1px solid var(--status-rejected-border)' }}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--status-rejected-text)' }}>Rejected</p>
                    <h3 className="text-4xl font-black mt-2" style={{ color: 'var(--status-rejected-text)' }}>{stats.rejected}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-white/40 dark:bg-black/10" style={{ color: 'var(--status-rejected-text)' }}>
                    <XCircle className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-4 text-xs font-bold opacity-80" style={{ color: 'var(--status-rejected-text)' }}>
                  Invalid or closed
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}