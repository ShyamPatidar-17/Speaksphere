import { Link, useNavigate, useLocation } from "react-router-dom";
import { Moon, Sun, LogOut, ShieldCheck } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import "../style.css"; // ✅ Import styles

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // --- USER LOGIC ---
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch {
    user = null;
  }

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  // --- HELPER: Active Route Styling ---
  // Uses CSS classes: theme-nav-active vs theme-nav-link
  const getLinkClass = (path) =>
    location.pathname === path
      ? "px-4 py-2 rounded-full text-sm transition-all theme-nav-active"
      : "px-4 py-2 rounded-full text-sm transition-all theme-nav-link";

  return (
    // STRUCTURE: Tailwind (sticky, top-0, z-50)
    // COLOR: theme-nav (Handles bg, border, blur)
    <nav className="sticky top-0 z-50 w-full shadow-sm transition-colors duration-300 theme-nav">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link
          to={user ? "/home" : "/"}
          className="group flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300 theme-btn-gradient">
            S
          </div>
          <span className="text-2xl font-black tracking-tighter hidden sm:block theme-hero-name">
            SpeakSphere
          </span>
        </Link>

        {/* Navigation Links & Actions */}
        <div className="flex items-center gap-2">
          {/* THEME SWITCHER */}

          {user ? (
            <>
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-1 mr-4">
                <Link to="/home" className={getLinkClass("/home")}>
                  Home
                </Link>
                <Link
                  to="/add-complaint"
                  className={getLinkClass("/add-complaint")}
                >
                  Raise Issue
                </Link>
                <Link to="/complaints" className={getLinkClass("/complaints")}>
                  Community
                </Link>

                <Link
                  to="/my-complaints"
                  className={getLinkClass("/my-complaints")}
                >
                  My Complaints
                </Link>

                <Link to="/profile" className={getLinkClass("/profile")}>
                  Profile
                </Link>
              </div>

              {/* Separator */}
              <div className="h-8 w-px opacity-50 mx-2 hidden md:block theme-nav-border border-r"></div>

              <div className="flex items-center gap-3">
                {/* Admin Button */}
                {user.role === "admin" && (
                  <a
                    href="http://localhost:5174/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-amber-200 transition dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900/50"
                  >
                    <ShieldCheck className="w-3 h-3" />
                    Admin
                  </a>
                )}

                {/* Logout */}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 border theme-nav-link theme-nav-border hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20 dark:hover:text-red-400 dark:hover:border-red-900/50"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                
                className="text-white px-6 py-2.5 rounded-lg font-bold shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 theme-btn-gradient"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white px-6 py-2.5 rounded-lg font-bold shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 theme-btn-gradient"
              >
                Signup
              </Link>
            </div>
          )}

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full transition-all mr-2 border border-transparent hover:bg-gray-100 dark:hover:bg-white/5 theme-nav-link"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
