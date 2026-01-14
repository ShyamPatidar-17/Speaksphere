import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; 
import "../style.css"; 

export default function Home() {
  const navigate = useNavigate();
  // Using context to ensure re-render on theme change
  useTheme(); 

  let user = {};
  try {
     user = JSON.parse(localStorage.getItem("user")) || {};
  } catch (e) {
     user = {};
  }
  
  const firstName = user.name ? user.name.split(" ")[0] : "Student";

  return (
    // COLOR: theme-page | STRUCTURE: min-h-screen, font-sans
    <div className="min-h-screen theme-page transition-colors duration-500 font-sans">
      
      {/* 🌟 HERO SECTION */}
      {/* COLOR: theme-hero-bg */}
      <div className="relative theme-hero-bg pb-32 pt-24 px-6 rounded-b-[3rem] shadow-2xl overflow-hidden transition-all duration-500">
        
        {/* Shapes (COLOR: theme-hero-shape) */}
        <div className="absolute top-0 left-0 w-96 h-96 theme-hero-shape rounded-full -translate-x-1/2 -translate-y-1/2 blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 theme-hero-shape rounded-full translate-x-1/3 translate-y-1/3 blur-[80px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/20 border border-white/20 text-white text-sm font-bold mb-8 backdrop-blur-md shadow-lg">
            AI-Driven Grievance System 🚀
          </span>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
            Welcome back, <br className="hidden md:block" />
            {/* COLOR: theme-hero-name */}
            <span className="theme-hero-name">
              {firstName}
            </span> 👋
          </h1>
          
          {/* COLOR: theme-hero-sub */}
          <p className="text-lg md:text-xl theme-hero-sub max-w-2xl mx-auto leading-relaxed font-medium opacity-90">
            SpeakSphere is your campus voice. Raise concerns, support your peers, 
            and track resolutions with full transparency.
          </p>
        </div>
      </div>

      {/* 🚀 ACTION CARDS SECTION */}
      <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* --- Card 1: Raise Complaint (BLUE Theme) --- */}
          <div className="group theme-card relative overflow-hidden rounded-[2rem] p-8 transition-all duration-300 hover:-translate-y-2">
            
            {/* Corner Blob (COLOR: theme-accent-blue-soft) */}
            <div className="absolute top-0 right-0 w-32 h-32 theme-accent-blue-soft rounded-bl-[100px] -mr-6 -mt-6 transition-transform group-hover:scale-110 pointer-events-none"></div>
            
            <div className="relative z-10">
              {/* Icon Box (COLOR: theme-accent-blue-soft, theme-accent-blue-text) */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm transition-colors theme-accent-blue-soft theme-accent-blue-text">
                📝
              </div>
              
              <h3 className="text-2xl font-bold mb-3 theme-text-main">Raise Issue</h3>
              <p className="mb-8 leading-relaxed theme-text-sub">
                Submit a new grievance securely. Our AI analyzes priority for faster resolution.
              </p>
              
              {/* Button (COLOR: theme-btn-blue) */}
              <button
                onClick={() => navigate("/add-complaint")}
                className="w-full py-4 rounded-xl font-bold transition-all active:scale-95 theme-btn-blue"
              >
                Start New Complaint
              </button>
            </div>
          </div>

          {/* --- Card 2: My Dashboard (INDIGO Theme) --- */}
          <div className="group theme-card relative overflow-hidden rounded-[2rem] p-8 transition-all duration-300 hover:-translate-y-2">
            
            <div className="absolute top-0 right-0 w-32 h-32 theme-accent-indigo-soft rounded-bl-[100px] -mr-6 -mt-6 transition-transform group-hover:scale-110 pointer-events-none"></div>
            
            <div className="relative z-10">
              {/* Icon Box */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm transition-colors theme-accent-indigo-soft theme-accent-indigo-text">
                📌
              </div>
              
              <h3 className="text-2xl font-bold mb-3 theme-text-main">My Dashboard</h3>
              <p className="mb-8 leading-relaxed theme-text-sub">
                Track the live status of your submitted complaints and view admin remarks.
              </p>
              
              {/* Button */}
              <button
                onClick={() => navigate("/my-complaints")}
                className="w-full py-4 rounded-xl font-bold transition-all active:scale-95 theme-btn-indigo"
              >
                Track Status
              </button>
            </div>
          </div>

          {/* --- Card 3: Community (PURPLE Theme) --- */}
          <div className="group theme-card relative overflow-hidden rounded-[2rem] p-8 transition-all duration-300 hover:-translate-y-2">
            
            <div className="absolute top-0 right-0 w-32 h-32 theme-accent-purple-soft rounded-bl-[100px] -mr-6 -mt-6 transition-transform group-hover:scale-110 pointer-events-none"></div>
            
            <div className="relative z-10">
              {/* Icon Box */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm transition-colors theme-accent-purple-soft theme-accent-purple-text">
                🤝
              </div>
              
              <h3 className="text-2xl font-bold mb-3 theme-text-main">Community</h3>
              <p className="mb-8 leading-relaxed theme-text-sub">
                See what matters to others. Upvote critical issues to bring them to attention.
              </p>
              
              {/* Button */}
              <button
                onClick={() => navigate("/complaints")}
                className="w-full py-4 rounded-xl font-bold transition-all active:scale-95 theme-btn-purple"
              >
                Join Discussion
              </button>
            </div>
          </div>

        </div>

        {/* Footer Link */}
        <div className="mt-16 text-center">
          <p className="mb-4 font-medium theme-text-sub">Looking for account settings?</p>
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center justify-center gap-2 mx-auto font-bold underline-offset-4 hover:underline transition-colors theme-link"
          >
            Go to My Profile 
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}