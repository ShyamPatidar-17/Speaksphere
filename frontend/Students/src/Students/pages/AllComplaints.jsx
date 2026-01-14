import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../App";

export default function AllComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/complaints/all`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });

      console.log(res);

      // ✅ SORTING: Latest (Newest) First
      const sortedData = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setComplaints(sortedData);
    } catch {
      toast.error("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  const vote = async (id) => {
    try {
      await axios.post(
        `${API_URL}/api/complaints/${id}/vote`,
        {vote},
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      toast.success("Vote added!");
      fetchData();
    } catch {
      toast.error("You cannot vote twice on the same issue.");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  
  const getAvatarColor = (name) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
    const index = name ? name.length % colors.length : 0;
    return colors[index];
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            Community <span className="text-indigo-600">Voice</span>
          </h2>
          <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-lg">
            See what issues are trending on campus. Upvote the ones that matter to you.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading community issues...</p>
          </div>
        ) : (
          <>
            {/* Grid Layout */}
            {complaints.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {complaints.map((c) => (
                  <div 
                    key={c._id} 
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col justify-between h-full"
                  >
                    <div>
                      {/* Meta Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${getAvatarColor(c.user?.name)}`}>
                            {c.user?.name?.charAt(0).toUpperCase() || "A"}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-700">{c.user?.name || "Anonymous"}</span>
                            <span className="text-[10px] text-gray-400">
                                {new Date(c.createdAt || Date.now()).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                          {c.category}
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="font-bold text-lg text-slate-800 mb-2 leading-snug">
                        {c.title || "No Title Provided"}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6">
                        {c.text}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${c.status === 'resolved' ? 'bg-green-500' : c.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                        <span className="text-xs font-medium text-gray-500 capitalize">{c.status || 'Pending'}</span>
                      </div>

                      <button
                        onClick={() => vote(c._id)}
                        className="group flex items-center gap-2 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 px-4 py-1.5 rounded-full transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                        <span className="text-sm font-bold text-slate-600 group-hover:text-indigo-600">
                          {c.votes}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-gray-800">No complaints found</h3>
                <p className="text-gray-500">It looks like everything is running smoothly!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}