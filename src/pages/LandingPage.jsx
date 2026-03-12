import { ArrowRight, ShieldCheck, HeartPulse, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page animate-fade-in">
      <section className="hero-section">
        <div className="container hero-content">
          <div className="hero-badge">AI-Powered Healthcare</div>
          <h1 className="hero-title">
            Accessible Symptom <br />
            <span className="text-teal">Checker for Everyone</span>
          </h1>
          <p className="hero-tagline">
            Nidaan AI provides instant, reliable health guidance based on your symptoms.
            Specially designed to support rural communities in India.
          </p>
          <div className="hero-actions">
            <button className="cta-button primary" onClick={() => navigate('/checker')}>
              Check Symptoms <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <HeartPulse size={28} className="feature-icon" />
            </div>
            <h3>Intelligent Analysis</h3>
            <p>Advanced AI that understands your symptoms in natural language.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Clock size={28} className="feature-icon" />
            </div>
            <h3>Instant Guidance</h3>
            <p>Get immediate insights and recommendations anytime, anywhere.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <ShieldCheck size={28} className="feature-icon" />
            </div>
            <h3>Reliable & Safe</h3>
            <p>Built with privacy and medical accuracy in mind as a helpful guide.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
