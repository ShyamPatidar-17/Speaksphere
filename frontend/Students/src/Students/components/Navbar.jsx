import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Safely get user
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

  // Helper to check active route
  const isActive = (path) => 
    location.pathname === path 
      ? "text-indigo-600 bg-indigo-50 font-semibold" 
      : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50";

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to={user ? "/home" : "/"} className="group flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
            S
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
            SpeakSphere
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-1 mr-4">
                <Link to="/home" className={`px-4 py-2 rounded-full text-sm transition-all ${isActive("/home")}`}>
                  Home
                </Link>
                <Link to="/add-complaint" className={`px-4 py-2 rounded-full text-sm transition-all ${isActive("/add-complaint")}`}>
                  Raise Issue
                </Link>
                <Link to="/complaints" className={`px-4 py-2 rounded-full text-sm transition-all ${isActive("/complaints")}`}>
                  Community
                </Link>
                <Link to="/my-complaints" className={`px-4 py-2 rounded-full text-sm transition-all ${isActive("/my-complaints")}`}>
                  My Dashboard
                </Link>
                <Link to="/profile" className={`px-4 py-2 rounded-full text-sm transition-all ${isActive("/profile")}`}>
                  Profile
                </Link>
              </div>

              {/* User Actions */}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                
                {/* Admin Button */}
                {user.role === "admin" && (
                  <a
                    href="http://localhost:5174/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-amber-200 transition"
                  >
                    Admin Panel ↗
                  </a>
                )}

                {/* Logout */}
                <button
                  onClick={logout}
                  className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-red-100"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-gray-600 font-medium hover:text-indigo-600 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-medium shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}