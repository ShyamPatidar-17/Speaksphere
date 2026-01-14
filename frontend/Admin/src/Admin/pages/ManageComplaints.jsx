import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../App";

export default function ManageComplaints() {
  const [complaints, setComplaints] = useState([]);
  
  // 🔍 Filter States
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [searchText, setSearchText] = useState("");

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
      // ✅ SORTING LOGIC: Newest Date First
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
  }, [complaints, filterStatus, filterCategory, filterDepartment, searchText]);

  // 🎨 Status Badge Styling (Small pill)
  const getStatusBadge = (status) => {
    switch (status) {
      case "resolved": return "bg-green-200 text-green-800 border-green-300";
      case "rejected": return "bg-red-200 text-red-800 border-red-300";
      default: return "bg-yellow-200 text-yellow-800 border-yellow-300";
    }
  };

  // 🎨 Card Background Styling (The whole card)
  const getCardStyle = (status) => {
      switch (status) {
        case "resolved": return "bg-green-100 border-green-800"; // ✅ Green
        case "rejected": return "bg-red-100 border-red-800";     // ❌ Red
        default: return "bg-yellow-100 border-yellow-800";       // ⏳ Yellow (Pending)
      }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
       {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 border-l-8 border-indigo-600 pl-4">
            Manage Complaints
            </h1>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-semibold text-gray-600 mt-4 md:mt-0">
                Total: {filteredComplaints.length} / {complaints.length}
            </span>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
         
                <input 
                    type="text" 
                    placeholder="Search keywords..." 
                    className="md:col-span-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />

                <select 
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="All">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                </select>

                <select 
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</option>)}
                </select>

                <select 
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
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
                        className="text-red-500 text-sm font-semibold hover:underline"
                    >
                        Clear All Filters ✕
                    </button>
                </div>
            )}
        </div>

     
        <div className="grid gap-4">
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map((c) => (
              <div
                key={c._id}
               
                className={`p-6 rounded-xl shadow-sm hover:shadow-md transition border flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${getCardStyle(c.status)}`}
              >
              
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusBadge(c.status)}`}>
                        {c.status}
                    </span>
                    <span className="bg-white/50 border border-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {c.category}
                    </span>
                    <span className="bg-white/50 border border-indigo-200 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {c.department || "General"}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-1">{c.title || "Complaint Issue"}</h3>
                  <p className="text-gray-700 mb-2">{c.text}</p>
                  
                  <div className="text-xs text-gray-500 flex gap-4 font-medium">
                    <span>By: {"Anonymous"}</span>
                    <span>Votes: {c.votes}</span>
                    <span>Date: {new Date(c.createdAt || Date.now()).toLocaleDateString()}</span>
                  </div>
                </div>

             
                {c.status === "pending" && (
                  <div className="flex flex-col sm:flex-row gap-3 min-w-[200px]">
                    <button
                      onClick={() => updateStatus(c._id, "resolved")}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold shadow-sm transition transform hover:scale-105"
                    >
                      Resolve
                    </button>
                    <button
                      onClick={() => updateStatus(c._id, "rejected")}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold shadow-sm transition transform hover:scale-105"
                    >
                      Reject
                    </button>
                  </div>
                )}
                
           
                {c.status !== "pending" && (
                    <div className="text-gray-500 text-sm italic min-w-[100px] text-right font-medium">
                        Action Taken
                    </div>
                )}

              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-xl text-gray-400 font-semibold">No complaints found matching filters</p>
                <button 
                    onClick={() => {
                        setFilterStatus("All");
                        setFilterCategory("All");
                        setFilterDepartment("All");
                        setSearchText("");
                    }}
                    className="mt-4 text-indigo-600 hover:underline"
                >
                    Clear Filters
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}