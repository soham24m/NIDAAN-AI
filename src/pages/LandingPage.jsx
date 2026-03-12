import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, HeartPulse, Clock, Activity, FileText, Smartphone, UserCheck, Search, Image as ImageIcon, Mic } from 'lucide-react';
import './LandingPage.css';

// Reusable animated counter hook
const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return count;
};

const StatCounter = ({ end, label, suffix = '' }) => {
  const count = useCounter(end);
  return (
    <div className="hero-stat-item">
      <div className="hero-stat-number">{count}{suffix}</div>
      <div className="hero-stat-label">{label}</div>
    </div>
  );
};

export default function LandingPage() {
  const navigate = useNavigate();

  // Scroll Animation Setup
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page animate-fade-in">
      
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-circles-overlay">
          <div className="bg-circle bg-circle-1"></div>
          <div className="bg-circle bg-circle-2"></div>
          <div className="bg-circle bg-circle-3"></div>
        </div>

        <div className="hero-content-wrapper container">
          <div className="hero-text-content">
            <h1 className="hero-title">
              Healthcare Shouldn't Be a Privilege
            </h1>
            <p className="hero-tagline">
              Nidaan AI brings the future of medicine directly to rural communities across India. 
              Instant, reliable, and accessible health guidance powered by advanced artificial intelligence.
            </p>
            
            <button className="cta-button-orange" onClick={() => navigate('/checker')}>
              Check Your Symptoms <ArrowRight size={20} />
            </button>

            <div className="hero-stats-row">
              <StatCounter end={900} label="Indians" suffix="M+" />
              <StatCounter end={6} label="Languages" suffix="" />
              <StatCounter end={100} label="Free Forever" suffix="%" />
            </div>
          </div>

          <div className="hero-visual">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="mock-bubble mock-bot">
                  Namaste! How are you feeling today?
                </div>
                <div className="mock-bubble mock-user">
                  I have a mild fever and a headache since yesterday evening.
                </div>
                <div className="mock-bubble mock-bot">
                  I understand. Let me help you analyze these symptoms...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM SECTION */}
      <section className="problem-section relative-z">
        <div className="container">
          <div className="section-header scroll-animate">
            <h2 className="section-title text-brown">The Challenge We Face</h2>
            <p className="text-brown-light">Access to basic healthcare remains a significant hurdle.</p>
          </div>
          <div className="problem-grid">
            <div className="problem-stat scroll-animate" style={{ transitionDelay: '100ms' }}>
              <div className="problem-icon-wrap"><UserCheck size={32} /></div>
              <h3>1 Doctor</h3>
              <p className="text-brown-light">For every 1,511 people in India, far below WHO recommendations.</p>
            </div>
            <div className="problem-stat scroll-animate" style={{ transitionDelay: '200ms' }}>
              <div className="problem-icon-wrap"><Activity size={32} /></div>
              <h3>70% Population</h3>
              <p className="text-brown-light">Lives in rural areas with access to only 30% of total hospitals.</p>
            </div>
            <div className="problem-stat scroll-animate" style={{ transitionDelay: '300ms' }}>
              <div className="problem-icon-wrap"><Clock size={32} /></div>
              <h3>Crucial Delays</h3>
              <p className="text-brown-light">Critical conditions go unnoticed due to lack of preliminary diagnosis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOLUTION SECTION */}
      <section className="solution-section relative-z">
        <div className="container">
          <div className="section-header scroll-animate text-center" style={{ textAlign: 'center' }}>
            <h2 className="section-title text-brown">How Nidaan Works</h2>
            <p className="text-brown-light">Three simple steps to better health understanding.</p>
          </div>
          <div className="steps-grid">
            <div className="step-card scroll-animate" style={{ transitionDelay: '100ms' }}>
              <div className="step-number">01</div>
              <h3>Share Symptoms</h3>
              <p className="text-brown-light">Type, speak, or upload photos of your symptoms in your preferred native language.</p>
            </div>
            <div className="step-card scroll-animate" style={{ transitionDelay: '200ms' }}>
              <div className="step-number">02</div>
              <h3>AI Analysis</h3>
              <p className="text-brown-light">Our model securely processes your inputs against vast medical databases instantly.</p>
            </div>
            <div className="step-card scroll-animate" style={{ transitionDelay: '300ms' }}>
              <div className="step-number">03</div>
              <h3>Get Insights</h3>
              <p className="text-brown-light">Receive probable conditions, urgency levels, and safe over-the-counter medicine suggestions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section className="features-section relative-z">
        <div className="container">
          <div className="section-header scroll-animate text-center" style={{ textAlign: 'center' }}>
            <h2 className="section-title text-brown">Powerful Features</h2>
            <p className="text-brown-light">Designed strictly for accessibility and ease of use.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card-warm scroll-animate">
              <div className="feature-icon-green"><Mic size={28} /></div>
              <h3>Voice Input</h3>
              <p className="text-brown-light">Speak your symptoms directly. No typing required.</p>
            </div>
            <div className="feature-card-warm scroll-animate" style={{ transitionDelay: '100ms' }}>
              <div className="feature-icon-green"><ImageIcon size={28} /></div>
              <h3>Photo Diagnosis</h3>
              <p className="text-brown-light">Upload images of rashes or external injuries for visual analysis.</p>
            </div>
            <div className="feature-card-warm scroll-animate" style={{ transitionDelay: '200ms' }}>
              <div className="feature-icon-green"><Search size={28} /></div>
              <h3>Multi-lingual</h3>
              <p className="text-brown-light">Full support for English and 5 major regional Indian languages.</p>
            </div>
            <div className="feature-card-warm scroll-animate" style={{ transitionDelay: '300ms' }}>
              <div className="feature-icon-green"><ShieldCheck size={28} /></div>
              <h3>Emergency Alerts</h3>
              <p className="text-brown-light">Instant red-flagging and helpline routing for high-risk conditions.</p>
            </div>
            <div className="feature-card-warm scroll-animate" style={{ transitionDelay: '400ms' }}>
              <div className="feature-icon-green"><HeartPulse size={28} /></div>
              <h3>Medication Ideas</h3>
              <p className="text-brown-light">Safe, basic over-the-counter (OTC) recommendations for minor ailments.</p>
            </div>
            <div className="feature-card-warm scroll-animate" style={{ transitionDelay: '500ms' }}>
              <div className="feature-icon-green"><FileText size={28} /></div>
              <h3>PDF Reports</h3>
              <p className="text-brown-light">Download a clean, printable PDF to share with your local physician.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LANGUAGES SECTION */}
      <section className="languages-section relative-z">
        <div className="container scroll-animate">
          <h2 className="section-title text-brown">Speaking Your Language</h2>
          <p className="text-brown-light" style={{ maxWidth: '600px', margin: '0 auto' }}>
            We believe language should never be a barrier to healthcare. Nidaan AI is fluently available in:
          </p>
          <div className="language-pills">
            <div className="lang-pill">English</div>
            <div className="lang-pill">हिंदी</div>
            <div className="lang-pill">தமிழ்</div>
            <div className="lang-pill">తెలుగు</div>
            <div className="lang-pill">ಕನ್ನಡ</div>
            <div className="lang-pill">മലയാളം</div>
          </div>
        </div>
      </section>

      {/* 6. EMERGENCY SECTION */}
      <section className="emergency-section relative-z">
        <div className="container scroll-animate">
          <div className="emergency-content">
            <h2 className="section-title" style={{ color: '#be123c' }}>We've Got You Covered</h2>
            <p style={{ color: '#be123c', fontSize: '1.2rem', opacity: 0.9 }}>In case of severe emergencies, Nidaan automatically connects you.</p>
            <div className="emergency-numbers">
              <div className="number-card">
                <h2>108</h2>
                <p className="text-brown-light" style={{ fontWeight: 600 }}>National Ambulance</p>
              </div>
              <div className="number-card">
                <h2>104</h2>
                <p className="text-brown-light" style={{ fontWeight: 600 }}>Health Helpline</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER SECTION */}
      <footer className="landing-footer relative-z">
        <div className="container">
          <h2>Nidaan AI</h2>
          <p style={{ opacity: 0.8, maxWidth: '500px', margin: '0 auto 2rem' }}>
            Empowering rural communities with accessible, AI-driven preliminary healthcare diagnostics.
          </p>
          <button className="cta-button-orange" onClick={() => navigate('/checker')} style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
            Try it now
          </button>
          <div className="footer-bottom">
            <p>Built with purpose by Team Nidaan | SRM University &copy; {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
