import { useEffect, useState } from "react";
import axios from "axios";
import { 
  MessageSquare, 
  ThumbsUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Loader2,
  Calendar
} from "lucide-react";
import { API_URL } from "../App"; 
import "../style.css"; 

export default function MyComplaints() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/complaints`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });
        const myComplaints = res.data.filter((c) => c.user?._id === user?.id || c.user === user?.id);
        setList(myComplaints);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchComplaints();
  }, [user]);

  // ✅ New Helper: Selects the Card Background Class based on status
  const getCardVariant = (status) => {
    switch (status.toLowerCase()) {
      case "resolved": return "card-resolved";
      case "rejected": return "card-rejected";
      default: return "card-pending";
    }
  };

  // Helper for Badge/Icon Styling
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "resolved": 
        return { icon: <CheckCircle className="w-4 h-4" />, class: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" };
      case "rejected": 
        return { icon: <XCircle className="w-4 h-4" />, class: "text-red-600 bg-red-100 dark:bg-red-900/50 dark:text-red-400 border-red-200 dark:border-red-800" };
      default: 
        return { icon: <Clock className="w-4 h-4" />, class: "text-amber-600 bg-amber-100 dark:bg-amber-900/50 dark:text-amber-400 border-amber-200 dark:border-amber-800" };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center theme-page">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12 relative overflow-hidden transition-colors duration-300 theme-page">
      
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl theme-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl theme-blob"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold theme-text-main">My Complaints</h2>
            <p className="theme-text-sub text-sm">Track the status of your reported issues</p>
          </div>
        </div>

        {list.length === 0 ? (
          <div className="theme-card backdrop-blur-xl rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-gray-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 theme-text-sub" />
            </div>
            <h3 className="text-xl font-medium theme-text-main mb-2">No complaints found</h3>
            <p className="theme-text-sub">You haven't reported any issues yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((c) => {
              const statusData = getStatusBadge(c.status);
              
              return (
                <div 
                  key={c._id} 
                  // ✅ DYNAMIC CLASS: card-base + specific color variant
                  className={`card-base rounded-2xl p-6 hover:-translate-y-1 ${getCardVariant(c.status)}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    {/* Status Badge */}
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusData.class}`}>
                      {statusData.icon}
                      {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                    </span>
                    
                    {c.category && (
                      <span className="text-xs font-bold theme-text-sub bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md">
                        {c.category}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold theme-text-main mb-2 line-clamp-1">
                    {c.title || "Untitled Issue"}
                  </h3>
                  
                  <p className="theme-text-sub text-sm mb-6 line-clamp-3 min-h-[60px]">
                    {c.text}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/5 text-sm theme-text-sub">
                    <div className="flex items-center gap-1.5 font-medium">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{c.votes} Votes</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}