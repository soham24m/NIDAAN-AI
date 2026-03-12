import { Outlet, Link } from 'react-router-dom';
import { Activity } from 'lucide-react';
import './Layout.css';

export default function Layout() {
  return (
    <div className="layout-wrapper">
      <nav className="navbar">
        <div className="container nav-content">
          <Link to="/" className="brand">
            <Activity className="brand-icon" size={28} />
            <span className="brand-text">Nidaan AI</span>
          </Link>
          <div className="nav-links">
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
