import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  // Safely parse user data
  let user = {};
  try {
     user = JSON.parse(localStorage.getItem("user")) || {};
  } catch (e) {
     user = {};
  }
  
  const firstName = user.name ? user.name.split(" ")[0] : "Student";

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* 🌟 Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 pb-32 pt-20 px-6 rounded-b-[40px] shadow-2xl overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 opacity-20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-100 text-sm font-semibold mb-6 backdrop-blur-sm">
            AI-Driven Grievance System 🚀
          </span>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Welcome back, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-100">
              {firstName}
            </span> 👋
          </h1>
          
          <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed opacity-90">
            SpeakSphere is your campus voice. Raise concerns, support your peers, 
            and track resolutions with full transparency.
          </p>
        </div>
      </div>

      {/* 🚀 Action Cards (Overlapping Hero) */}
      <div className="max-w-6xl mx-auto px-6 -mt-20 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Raise Complaint */}
          <div className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm">
                📝
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Raise Issue</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Submit a new grievance securely. Our AI analyzes priority for faster resolution.
              </p>
              <button
                onClick={() => navigate("/add-complaint")}
                className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all active:scale-95"
              >
                Start New Complaint
              </button>
            </div>
          </div>

          {/* Card 2: My Dashboard */}
          <div className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm">
                📌
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">My Dashboard</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Track the live status of your submitted complaints and view admin remarks.
              </p>
              <button
                onClick={() => navigate("/my-complaints")}
                className="w-full py-3.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all active:scale-95"
              >
                Track Status
              </button>
            </div>
          </div>

          {/* Card 3: Community */}
          <div className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm">
                🤝
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Community</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                See what matters to others. Upvote critical issues to bring them to attention.
              </p>
              <button
                onClick={() => navigate("/complaints")}
                className="w-full py-3.5 rounded-xl bg-purple-600 text-white font-semibold shadow-lg shadow-purple-200 hover:bg-purple-700 hover:shadow-purple-300 transition-all active:scale-95"
              >
                Join Discussion
              </button>
            </div>
          </div>

        </div>

        {/* Quick Link Footer */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-4">Looking for account settings?</p>
          <button
            onClick={() => navigate("/profile")}
            className="text-indigo-600 font-bold hover:text-indigo-800 hover:underline underline-offset-4 transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            Go to My Profile 
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}