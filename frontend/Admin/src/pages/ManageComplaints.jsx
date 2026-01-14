import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../App";
import { useTheme } from "../context/ThemeContext";
import "../Style.css"; 

export default function ManageComplaints() {
  const [complaints, setComplaints] = useState([]);
  
  // 🔍 Filter States
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [searchText, setSearchText] = useState("");

  const { theme } = useTheme(); 

  // Fetch Data
  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/complaints`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setComplaints(res.data);
    } catch (err) {
      toast.error("Failed to load complaints");
    }
  };

  // Update Status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${API_URL}/api/complaints/${id}/status`,
        { status },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      toast.success(`Complaint marked as ${status}`);
      fetchComplaints();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const uniqueCategories = ["All", ...new Set(complaints.map((c) => c.category))];
  const uniqueDepartments = ["All", ...new Set(complaints.map((c) => c.department || "Unassigned"))];

  const filteredComplaints = useMemo(() => {
    return complaints
      .filter((c) => {
        const matchesStatus = filterStatus === "All" || c.status === filterStatus.toLowerCase();
        const matchesCategory = filterCategory === "All" || c.category === filterCategory;
        const matchesDepartment = filterDepartment === "All" || (c.department || "Unassigned") === filterDepartment;
        const matchesSearch = c.text.toLowerCase().includes(searchText.toLowerCase()) || c.title?.toLowerCase().includes(searchText.toLowerCase());

        return matchesStatus && matchesCategory && matchesDepartment && matchesSearch;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
  }, [complaints, filterStatus, filterCategory, filterDepartment, searchText]);


  const getBadgeClass = (status) => {
    switch (status) {
      case "resolved": return "badge-resolved";
      case "rejected": return "badge-rejected";
      default: return "badge-pending";
    }
  };


  const getCardClass = (status) => {
    switch (status) {
      case "resolved": return "card-status-resolved";
      case "rejected": return "card-status-rejected";
      default: return "card-status-pending";
    }
  };

  return (
   
    <div className="min-h-screen p-6 md:p-10 admin-page">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold border-l-8 pl-4 admin-header" style={{ borderColor: 'var(--text-title)' }}>
              Manage Complaints
            </h1>
            <span className="px-4 py-2 rounded-full shadow-sm text-sm font-semibold mt-4 md:mt-0 admin-card">
                Total: {filteredComplaints.length} / {complaints.length}
            </span>
        </div>

        {/* Filters Section */}
        <div className="p-6 rounded-xl shadow-md mb-8 admin-card">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <input 
                    type="text" 
                    placeholder="Search keywords..." 
                    className="md:col-span-2 p-3 rounded-lg admin-filter"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />

                <select 
                    className="p-3 rounded-lg admin-filter"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="All">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                </select>

                <select 
                    className="p-3 rounded-lg admin-filter"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</option>)}
                </select>

                <select 
                    className="p-3 rounded-lg admin-filter"
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                >
                      {uniqueDepartments.map(dept => <option key={dept} value={dept}>{dept === "All" ? "All Departments" : dept}</option>)}
                </select>
            </div>

            {(filterStatus !== "All" || filterCategory !== "All" || filterDepartment !== "All" || searchText) && (
                <div className="mt-4 flex justify-end">
                    <button 
                        onClick={() => {
                            setFilterStatus("All");
                            setFilterCategory("All");
                            setFilterDepartment("All");
                            setSearchText("");
                        }}
                        className="text-sm font-semibold text-clear-filter"
                    >
                        Clear All Filters ✕
                    </button>
                </div>
            )}
        </div>

        {/* Complaints Grid */}
        <div className="grid gap-4">
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map((c) => (
              <div
                key={c._id}
                className={`p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${getCardClass(c.status)}`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider badge-base ${getBadgeClass(c.status)}`}>
                        {c.status}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold badge-base badge-neutral">
                        {c.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold badge-base badge-neutral">
                        {c.department || "General"}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-1 text-main">{c.title || "Complaint Issue"}</h3>
                  <p className="mb-2 text-sub">{c.text}</p>
                  
                  <div className="text-xs flex gap-4 font-medium opacity-80 text-sub">
                    <span>By: {"Anonymous"}</span>
                    <span>Votes: {c.votes}</span>
                    <span>Date: {new Date(c.createdAt || Date.now()).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Actions (Only if Pending) */}
                {c.status === "pending" && (
                  <div className="flex flex-col sm:flex-row gap-3 min-w-[200px]">
                    <button
                      onClick={() => updateStatus(c._id, "resolved")}
                      className="flex-1 px-4 py-2 rounded-lg font-bold shadow-sm transition transform hover:scale-105 btn-resolve"
                    >
                      Resolve
                    </button>
                    <button
                      onClick={() => updateStatus(c._id, "rejected")}
                      className="flex-1 px-4 py-2 rounded-lg font-bold shadow-sm transition transform hover:scale-105 btn-reject"
                    >
                      Reject
                    </button>
                  </div>
                )}
                
                {/* Status Indicator (If not pending) */}
                {c.status !== "pending" && (
                    <div className="text-sm italic min-w-[100px] text-right font-medium text-sub opacity-70">
                        Action Taken
                    </div>
                )}

              </div>
            ))
          ) : (
            <div className="text-center py-20 rounded-xl border border-dashed admin-card" style={{ borderColor: 'var(--text-sub)' }}>
                <p className="text-xl font-semibold text-sub">No complaints found matching filters</p>
                <button 
                    onClick={() => {
                        setFilterStatus("All");
                        setFilterCategory("All");
                        setFilterDepartment("All");
                        setSearchText("");
                    }}
                    className="mt-4 font-bold hover:underline stat-text-neutral"
                >
                    Reset Filters
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}