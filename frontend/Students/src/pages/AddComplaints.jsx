import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast"; 
import { useNavigate } from "react-router-dom";
import { API_URL } from "../App";
import "../style.css"; 
import { 
  Type, 
  AlignLeft, 
  Layers, 
  Send, 
  X, 
  Loader2, 
  PenLine
} from "lucide-react";

export default function AddComplaint() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) {
      toast.error("Please fill in both title and description ⚠️");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${API_URL}/api/complaints`,
        // ✅ Updated Payload: Removed 'department' to match Schema
        { title, text, category }, 
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );

      toast.success("Complaint sent! 🚀");
      setTimeout(() => navigate("/complaints"), 1500);

    } catch (err) {
      toast.error(err.response?.data?.msg || "Submission failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300 theme-page">
      <Toaster position="top-center" />

      {/* --- DECORATIVE BLOBS --- */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none animate-pulse theme-blob"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none theme-blob"></div>

      {/* --- MAIN CARD --- */}
      <div className="w-full max-w-2xl relative z-10 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border transition-colors duration-300 theme-card">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 mb-6 shadow-lg shadow-indigo-500/30 transform hover:scale-105 transition-transform duration-300">
            <PenLine className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-black tracking-tight mb-2 theme-text-main">
            Raise a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Grievance</span>
          </h2>
          <p className="text-lg font-medium theme-text-sub">
            We are here to listen. Don't hold back.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold ml-1 flex items-center gap-2 theme-text-sub">
              <Type className="w-4 h-4 text-indigo-500" />
              Issue Title
            </label>
            <input
              type="text"
              placeholder="e.g., WiFi not working in Library"
              className="w-full p-4 rounded-2xl border-2 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-semibold theme-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Category Dropdown (Now Full Width) */}
          <div className="space-y-2">
            <label className="text-sm font-bold ml-1 flex items-center gap-2 theme-text-sub">
              <Layers className="w-4 h-4 text-purple-500" />
              Category
            </label>
            <div className="relative">
              <select 
                className="w-full p-4 rounded-2xl border-2 outline-none appearance-none cursor-pointer focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-semibold theme-input"
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
              >
                {/* Simplified categories based on general student needs */}
                {["General", "Academics", "Infrastructure", "Hostel", "Mess", "Sports", "WiFi/Internet", "Examination"].map(opt => (
                  <option key={opt} className="theme-input">{opt}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none theme-text-sub">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
              </div>
            </div>
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold ml-1 flex items-center gap-2 theme-text-sub">
              <AlignLeft className="w-4 h-4 text-indigo-500" />
              Description
            </label>
            <textarea
              className="w-full p-4 rounded-2xl border-2 outline-none resize-none h-40 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium leading-relaxed theme-input"
              placeholder="Describe the issue in detail..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-1/3 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 border-2 border-transparent btn-cancel"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="w-2/3 py-4 rounded-2xl text-white font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-[0_10px_20px_-5px_rgba(99,102,241,0.4)] transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Complaint
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}