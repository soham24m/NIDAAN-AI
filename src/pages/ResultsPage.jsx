import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, FileText, ArrowLeft, Activity, ShieldAlert, Phone, Download, Pill } from 'lucide-react';
import './ResultsPage.css';

const generateParticles = () => {
  return [...Array(15)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${5 + Math.random() * 10}s`
  }));
};

const INITIAL_PARTICLES = generateParticles();

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.state?.symptoms || 'General symptom inquiry';

  // Simulated ML classification logic based on simple keyword matching for demo purposes
  const isHighEmergency = query.toLowerCase().includes('chest pain') || query.toLowerCase().includes('heart') || query.toLowerCase().includes('breathing') || query.toLowerCase().includes('blood');
  
  const mockConditions = isHighEmergency ? [
    { name: "Myocardial Infarction (Heart Attack)", probability: 89, color: "#ef4444" },
    { name: "Severe Angina", probability: 65, color: "#f97316" },
    { name: "Pulmonary Embolism", probability: 42, color: "#eab308" }
  ] : [
    { name: "Viral Infection (Common Cold)", probability: 85, color: "#22c55e" },
    { name: "Seasonal Allergies", probability: 45, color: "#eab308" },
    { name: "Mild Influenza", probability: 20, color: "#3b82f6" }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="results-page animate-fade-in container">
      {/* Floating Particles Background */}
      <div className="particles-overlay">
        {INITIAL_PARTICLES.map((p) => (
          <div key={`p-${p.id}`} className="particle" style={{
            left: p.left,
            top: p.top,
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration
          }}></div>
        ))}
      </div>
      
      {/* Top action bar */}
      <div className="actions-bar no-print relative-z">
        <button className="back-button" onClick={() => navigate('/checker')}>
          <ArrowLeft size={20} /> Back to checker
        </button>
        <button className="download-btn glowing-gold-btn" onClick={handlePrint}>
          <Download size={18} /> Download PDF Report
        </button>
      </div>

      {/* Emergency Banner */}
      {isHighEmergency && (
        <div className="emergency-banner relative-z">
          <ShieldAlert className="emergency-icon pulse-alert" size={32} />
          <div className="emergency-content">
            <h2>HIGH EMERGENCY DETECTED</h2>
            <p>Your symptoms indicate a potentially life-threatening condition. Please seek immediate medical help.</p>
            <div className="helpline-numbers">
              <a href="tel:108" className="helpline-btn"><Phone size={16}/> 108 (Ambulance)</a>
              <a href="tel:104" className="helpline-btn"><Phone size={16}/> 104 (Health Helpline)</a>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="results-header relative-z">
        <h1>Analysis Results</h1>
        <p className="query-summary">Based on: "{query}"</p>
      </div>

      <div className="results-grid relative-z">
        {/* Main Conditions List */}
        <div className="result-card main-analysis glass-panel">
          <div className="card-header">
            <Activity className="card-icon text-teal" />
            <h2>Probable Conditions</h2>
          </div>
          <div className="card-body">
            <div className="conditions-list">
              {mockConditions.map((condition, idx) => (
                <div key={idx} className="condition-item">
                  <div className="condition-info">
                    <span className="condition-name">{condition.name}</span>
                    <span className="condition-prob text-cyan">{condition.probability}% Match</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill glowing-bar" 
                      style={{ 
                        width: `${condition.probability}%`,
                        backgroundColor: condition.color,
                        boxShadow: `0 0 10px ${condition.color}`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebars */}
        <div className="sidebar-cards">
          
          <div className={`result-card urgency-card glass-panel ${isHighEmergency ? 'high-urgency' : 'low-urgency'}`}>
            <div className="card-header">
              <AlertCircle className={`card-icon ${isHighEmergency ? 'text-danger glow-danger' : 'text-success glow-success'}`} />
              <h2>Urgency Level</h2>
            </div>
            <div className="card-body">
              <div className={`urgency-badge ${isHighEmergency ? 'high' : 'low'}`}>
                {isHighEmergency ? 'HIGH EMERGENCY' : 'Low / Routine'}
              </div>
              <p className="mt-2">
                {isHighEmergency 
                  ? "Go to the nearest emergency room immediately."
                  : "Consider consulting a general physician if symptoms persist for more than 48 hours."}
              </p>
            </div>
          </div>

          {!isHighEmergency && (
            <div className="result-card glass-panel gold-accent-card">
              <div className="card-header">
                <Pill className="card-icon text-gold" />
                <h2 className="text-gold">Safe OTC Medicine Ideas</h2>
              </div>
              <div className="card-body">
                <ul className="next-steps-list">
                  <li>Paracetamol (for mild fever/pain)</li>
                  <li>Cetirizine (for allergies/sneezing)</li>
                  <li>ORS (for hydration)</li>
                </ul>
              </div>
            </div>
          )}

          <div className="result-card glass-panel">
            <div className="card-header">
              <FileText className="card-icon text-teal" />
              <h2>Next Steps</h2>
            </div>
            <div className="card-body">
              <ul className="next-steps-list">
                {isHighEmergency ? (
                  <>
                    <li className="text-danger"><strong>Call 108 immediately</strong></li>
                    <li>Do not drive yourself to the hospital</li>
                    <li>Unlock your front door</li>
                  </>
                ) : (
                  <>
                    <li>Monitor your temperature daily</li>
                    <li>Stay home and rest</li>
                    <li>Stay hydrated</li>
                    <li className="text-cyan"><strong>See a doctor if symptoms worsen</strong></li>
                  </>
                )}
              </ul>
            </div>
          </div>

        </div>
      </div>
      
      {/* Disclaimer Section */}
      <div className="medical-disclaimer relative-z">
        <h3>Medical Disclaimer</h3>
        <p>This report is generated by an Artificial Intelligence system and is <strong>not a substitute for professional medical advice, diagnosis, or treatment.</strong> Never disregard professional medical advice or delay in seeking it because of something you have read on Nidaan AI.</p>
      </div>

    </div>
  );
}
