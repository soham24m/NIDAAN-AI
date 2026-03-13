import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './LandingPage.css';

import heroBg from '../assets/images/hero_bg.png';
import docPhoto from '../assets/images/doc_photo.png';
import patientPhone from '../assets/images/patient_phone.png';
import familyHealth from '../assets/images/family_health.png';

export default function LandingPage() {
  const navigate = useNavigate();

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
    <div className="landing-page-editorial">
      
      {/* 1. HERO SECTION */}
      <section className="ep-hero" style={{ backgroundImage: `linear-gradient(rgba(26, 46, 26, 0.3), rgba(26, 46, 26, 0.7)), url(${heroBg})` }}>
        <nav className="ep-nav">
          <div className="ep-logo">+ Nidaan</div>
        </nav>
        
        <div className="ep-hero-content container">
          <div className="ep-hero-text">
            <h1 className="ep-hero-title scroll-animate">Brightening your health path</h1>
            <button className="ep-cta-button scroll-animate" onClick={() => navigate('/checker')}>
              Check Symptoms <ArrowRight size={20} />
            </button>
          </div>
          
          <div className="ep-hero-stats scroll-animate" style={{ transitionDelay: '0.2s' }}>
            <div className="ep-stat">
              <span className="ep-stat-value">99.99%</span>
              <span className="ep-stat-label">Patient Satisfaction</span>
            </div>
            <div className="ep-stat">
              <span className="ep-stat-value">6+</span>
              <span className="ep-stat-label">Languages Supported</span>
            </div>
            <div className="ep-stat">
              <span className="ep-stat-value">900M+</span>
              <span className="ep-stat-label">Indians We Serve</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECOND SECTION */}
      <section className="ep-section ep-light-bg">
        <div className="container ep-split-layout">
          <div className="ep-grid-photos scroll-animate">
            <img src={docPhoto} alt="Doctor" className="ep-photo ep-photo-1" />
            <img src={patientPhone} alt="Patient on Phone" className="ep-photo ep-photo-2" />
            <img src={familyHealth} alt="Family Health" className="ep-photo ep-photo-3" />
          </div>
          
          <div className="ep-text-content scroll-animate" style={{ transitionDelay: '0.2s' }}>
            <h2 className="ep-section-title">Healthcare Anytime, Anywhere</h2>
            <p className="ep-section-subtext">
              Experience the future of preliminary diagnosis. Our advanced AI-powered platform understands your symptoms and connects you with the right guidance, bridging the gap between rural communities and quality healthcare.
            </p>
            <div className="ep-feature-badges">
              <span className="ep-badge">Voice Input Available</span>
              <span className="ep-badge">Photo Diagnosis</span>
              <span className="ep-badge">6 Languages</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THIRD SECTION */}
      <section className="ep-section ep-dark-bg">
        <div className="container">
          <div className="ep-process-steps">
            <div className="ep-step scroll-animate">
              <div className="ep-step-number">01</div>
              <h3 className="ep-step-title">Describe symptoms</h3>
              <p className="ep-step-desc">Speak or type how you're feeling in your native language.</p>
            </div>
            <div className="ep-step scroll-animate" style={{ transitionDelay: '0.2s' }}>
              <div className="ep-step-number">02</div>
              <h3 className="ep-step-title">AI analyzes</h3>
              <p className="ep-step-desc">Our intelligent system safely evaluates your condition instantly.</p>
            </div>
            <div className="ep-step scroll-animate" style={{ transitionDelay: '0.4s' }}>
              <div className="ep-step-number">03</div>
              <h3 className="ep-step-title">Get guidance</h3>
              <p className="ep-step-desc">Receive clear, actionable next steps for your health journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOURTH SECTION */}
      <section className="ep-section ep-light-bg ep-center-text">
        <div className="container">
          <h2 className="ep-section-title scroll-animate">Speaking Your Language</h2>
          <div className="ep-languages scroll-animate" style={{ transitionDelay: '0.1s' }}>
            <span>हिंदी</span>
            <span>தமிழ்</span>
            <span>తెలుగు</span>
            <span>ಕನ್ನಡ</span>
            <span>മലയാളം</span>
            <span>English</span>
          </div>
          
          <div className="ep-emergency-box scroll-animate" style={{ transitionDelay: '0.2s' }}>
            <h3 className="ep-emergency-title">Emergency Support</h3>
            <div className="ep-emergency-numbers">
              <div className="ep-emergency-item">
                <span className="ep-huge-number">108</span>
                <span className="ep-emergency-label">Ambulance</span>
              </div>
              <div className="ep-emergency-item">
                <span className="ep-huge-number">104</span>
                <span className="ep-emergency-label">Health Helpline</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="ep-footer scroll-animate">
        <div className="container">
          <div className="ep-footer-logo">+ Nidaan AI</div>
          <p className="ep-footer-mission">"Empowering Rural India"</p>
          <div className="ep-footer-credits">
            Team Nidaan | SRM University Kattankulathur
          </div>
        </div>
      </footer>

    </div>
  );
}
