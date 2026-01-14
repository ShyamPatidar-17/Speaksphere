import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../App";
import { ThumbsUp, Calendar, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react"; 
import { useTheme } from "../context/ThemeContext"; // ✅ Import Context
import "../style.css"; // ✅ Import Theme Styles

export default function AllComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ✅ Access Context
  const { theme, toggleTheme } = useTheme();

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/complaints/all`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      setComplaints(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch {
      toast.error("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  const vote = async (id) => {
    try {
      await axios.post(`${API_URL}/api/complaints/${id}/vote`, {vote}, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
      toast.success("Vote added!");
      fetchData();
    } catch {
      toast.error("You cannot vote twice.");
    }
  };

  useEffect(() => { fetchData(); }, []);
  
  const getAvatarColor = (name) => {
    const colors = ['bg-rose-500', 'bg-indigo-500', 'bg-emerald-500', 'bg-amber-500', 'bg-violet-500', 'bg-pink-500'];
    return colors[(name ? name.length : 0) % colors.length];
  }

  // Helper for Status CSS Classes (Defined in style.css)
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "resolved": return "status-resolved";
      case "rejected": return "status-rejected";
      default: return "status-pending";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "resolved": return <CheckCircle className="w-3 h-3" />;
      case "rejected": return <XCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  return (
    // STRUCTURE: Tailwind | COLOR: theme-page
    <div className="min-h-screen p-6 md:p-12 relative transition-colors duration-300 theme-page">
      

      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl theme-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl theme-blob"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-12 mt-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight theme-text-main">
            Community <span className="theme-gradient-text">Voice</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg theme-text-sub">
            See what issues are trending on campus. Upvote the ones that matter to you.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-12 h-12 animate-spin mx-auto text-indigo-500" />
            <p className="mt-4 opacity-70 theme-text-sub">Loading community issues...</p>
          </div>
        ) : (
          <>
            {complaints.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {complaints.map((c) => (
                  <div 
                    key={c._id} 
                    // STRUCTURE: Tailwind | COLOR: theme-card, theme-card-hover
                    className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-full theme-card theme-card-hover backdrop-blur-md"
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md ${getAvatarColor(c.user?.name)}`}>
                            {c.user?.name?.charAt(0).toUpperCase() || "A"}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold theme-text-main">
                              {c.user?.name || "Anonymous"}
                            </span>
                            <span className="text-[10px] theme-text-sub">
                                {new Date(c.createdAt || Date.now()).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide theme-blob theme-text-main border border-transparent">
                          {c.category}
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="font-bold text-lg mb-2 leading-snug theme-text-main">
                        {c.title || "No Title Provided"}
                      </h3>
                      <p className="text-sm leading-relaxed mb-6 line-clamp-3 theme-text-sub">
                        {c.text}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-gray-500/10 flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(c.status)}`}>
                        {getStatusIcon(c.status)}
                        {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                      </span>

                      <button
                        onClick={() => vote(c._id)}
                        className="group flex items-center gap-2 px-4 py-1.5 rounded-full transition-colors theme-blob hover:bg-indigo-500/20"
                      >
                        <ThumbsUp className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-bold theme-text-main">
                          {c.votes}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 rounded-3xl theme-card border border-dashed border-gray-500/30">
                <div className="text-6xl mb-4">👻</div>
                <h3 className="text-xl font-bold theme-text-main">It's quiet in here...</h3>
                <p className="theme-text-sub">No complaints? Must be a good day!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}