import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react"; // Optional icons
import "../Style.css"; // ✅ Import Admin Styles

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // STRUCTURE: Tailwind | COLOR: admin-footer
    <footer className="admin-footer mt-auto w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
                A
              </span>
              <span>AdminPanel</span>
            </h2>
            <p className="text-sm leading-relaxed max-w-xs footer-text-sub">
              Manage campus grievances efficiently. Monitor stats, resolve issues, and ensure a transparent environment for students.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-xs mb-4 text-main">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="footer-link">Dashboard</Link></li>
              <li><Link to="/manage-complaints" className="footer-link">Manage Complaints</Link></li>
              <li><Link to="/profile" className="footer-link">Admin Profile</Link></li>
            </ul>
          </div>

          {/* Support / Legal */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-xs mb-4 text-main">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="footer-link">Documentation</a></li>
              <li><a href="#" className="footer-link">System Status</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gray-200 dark:bg-gray-700 mb-8 transition-colors duration-300"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs footer-text-sub">
          <p>© {currentYear} SpeakSphere Admin. All rights reserved.</p>
          
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            {/* Social Placeholders */}
            <a href="#" className="hover:text-indigo-500 transition"><Github className="w-4 h-4" /></a>
            <a href="#" className="hover:text-indigo-500 transition"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="hover:text-indigo-500 transition"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}