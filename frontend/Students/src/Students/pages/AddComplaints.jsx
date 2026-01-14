import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // ✅ Import for redirection
import { API_URL } from "../../App";

export default function AddComplaint() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");
  const [department, setDepartment] = useState("Administration");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); // ✅ Initialize navigation

  const submit = async () => {
    if (!title || !text) {
      toast.warning("Please fill in both title and description");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${API_URL}/api/complaints`,
        { title, text, category, department },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );

      toast.success("Complaint submitted successfully! 🚀");
      
      // ✅ Redirect to All Complaints page after success
      navigate("/complaints"); 

    } catch (err) {
      toast.error(err.response?.data?.msg || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-2xl border border-white/50 relative overflow-hidden">
        
        {/* Decorative Background Blob */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
              Raise a <span className="text-indigo-600">Grievance</span>
            </h2>
            <p className="text-gray-500 mt-2">
              We are here to listen. Please fill out the details below.
            </p>
          </div>

          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Issue Title
              </label>
              <input
                placeholder="e.g., WiFi not working in Library"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition-all placeholder-gray-400 font-medium"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Grid for Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                  Category
                </label>
                <div className="relative">
                  <select 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition-all appearance-none font-medium text-gray-700"
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>General</option>
                    <option>Academics</option>
                    <option>Infrastructure</option>
                    <option>Hostel</option>
                    <option>Examination</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                    ▼
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                  Department
                </label>
                <div className="relative">
                  <select 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition-all appearance-none font-medium text-gray-700"
                    value={department} 
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option>Administration</option>
                    <option>IT Cell</option>
                    <option>Academic Department</option>
                    <option>Hostel Office</option>
                    <option>Examination Cell</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Description
              </label>
              <textarea
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition-all h-32 resize-none placeholder-gray-400 font-medium"
                placeholder="Describe the issue in detail..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => navigate(-1)}
                className="w-1/3 py-3.5 rounded-xl text-gray-600 font-bold hover:bg-gray-100 transition border border-transparent hover:border-gray-200"
              >
                Cancel
              </button>
              
              <button
                disabled={loading}
                onClick={submit}
                className={`w-2/3 py-3.5 rounded-xl text-white font-bold shadow-lg shadow-indigo-200 transition-all transform active:scale-95 ${
                  loading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-300"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Submit Complaint"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}