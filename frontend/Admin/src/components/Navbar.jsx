import { Link, useNavigate, useLocation } from "react-router-dom";
import { Moon, Sun, LogOut, ExternalLink, User } from "lucide-react";
import { useTheme } from "../Context/ThemeContext";

import "../Style.css"; 
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

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
    navigate("/login");
  };

  // Helper to check active link for styling (Uses CSS classes)
  const getLinkClass = (path) =>
    location.pathname === path
      ? "px-4 py-2 rounded-lg text-sm font-bold transition-all nav-link-active"
      : "px-4 py-2 rounded-lg text-sm font-medium transition-all nav-link";

  return (
    // STRUCTURE: Tailwind (sticky, top-0, z-50) | COLOR: admin-navbar
    <nav className="sticky top-0 z-50 w-full admin-navbar">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to={user ? "/" : "/login"} className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform bg-indigo-600">
            A
          </div>
          <span className="text-2xl font-black tracking-tight hidden sm:block text-main">
            Admin<span className="text-indigo-600 dark:text-indigo-400">Panel</span>
          </span>
        </Link>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-4">
          
          {/* THEME TOGGLE */}
         

          {user ? (
            <>
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-2">
                <Link to="/" className={getLinkClass("/")}>
                  Dashboard
                </Link>
                <Link to="/manage-complaints" className={getLinkClass("/manage-complaints")}>
                  Manage Complaints
                </Link>
                <Link to="/profile" className={getLinkClass("/profile")}>
                  Profile
                </Link>
              </div>

              {/* Separator */}
              <div className="h-6 w-px mx-2 hidden md:block bg-gray-300 dark:bg-gray-700"></div>

              {/* User Actions */}
              <div className="flex items-center gap-3">
                
                {/* Link to Student Portal */}
                <a
                  href="http://localhost:5173/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition btn-student-view"
                >
                  Student View <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-3 pl-2">
                  <div className="hidden sm:flex flex-col text-right">
                    <span className="text-xs font-bold text-main">{user.name}</span>
                    <span className="text-[10px] uppercase font-bold text-indigo-500 tracking-wider">Admin</span>
                  </div>
                  
                  <button
                    onClick={logout}
                    className="p-2 rounded-lg transition-all btn-logout"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="font-medium transition nav-link"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2.5 rounded-lg font-bold transition-all btn-primary-admin"
              >
                Sign Up
              </Link>
            </div>
          )}

           <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-all btn-theme-toggle"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
}