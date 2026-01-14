import { Link } from "react-router-dom";
import "../style.css"; // ✅ Import Theme Styles

export default function Footer() {
  return (
    // STRUCTURE: Tailwind | COLOR: theme-footer
    <footer className="theme-footer transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 theme-text-main">
              {/* Logo uses the global gradient button style for consistency */}
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shadow-lg theme-btn-gradient text-white">
                S
              </span>
              SpeakSphere
            </h2>
            <p className="text-sm leading-relaxed max-w-xs theme-footer-sub">
              Empowering students to voice their concerns. An AI-driven grievance redressal system ensuring transparency and quick resolution.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 uppercase tracking-wider text-sm theme-text-main">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/home" className="theme-footer-link">Home</Link></li>
              <li><Link to="/complaints" className="theme-footer-link">Community Issues</Link></li>
              <li><Link to="/add-complaint" className="theme-footer-link">Raise Complaint</Link></li>
            </ul>
          </div>

          {/* Legal / Contact */}
          <div>
            <h3 className="font-semibold mb-4 uppercase tracking-wider text-sm theme-text-main">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="theme-footer-link">Help Center</a></li>
              <li><a href="#" className="theme-footer-link">Privacy Policy</a></li>
              <li><a href="#" className="theme-footer-link">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs theme-footer-sub" style={{ borderColor: 'var(--footer-border)' }}>
          <p>© {new Date().getFullYear()} SpeakSphere. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Made with ❤️ for Students</span>
          </div>
        </div>
      </div>
    </footer>
  );
}