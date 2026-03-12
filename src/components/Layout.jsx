import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Activity, Globe } from 'lucide-react';
import './Layout.css';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi (हिंदी)' },
  { code: 'ta', label: 'Tamil (தமிழ்)' },
  { code: 'te', label: 'Telugu (తెలుగు)' },
  { code: 'kn', label: 'Kannada (ಕನ್ನಡ)' },
  { code: 'ml', label: 'Malayalam (മലയാളം)' },
];

export default function Layout() {
  const [language, setLanguage] = useState('en');

  return (
    <div className="layout-wrapper">
      <nav className="navbar">
        <div className="container nav-content">
          <Link to="/" className="brand">
            <Activity className="brand-icon" size={28} />
            <span className="brand-text">Nidaan AI</span>
          </Link>
          <div className="nav-actions">
            <div className="language-selector">
              <Globe size={18} className="lang-icon" />
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="lang-select"
                aria-label="Select Language"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
            <Link to="/checker" className="nav-link">Check Symptoms</Link>
          </div>
        </div>
      </nav>
      
      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Nidaan AI. Empowering rural healthcare.</p>
        </div>
      </footer>
    </div>
  );
}
