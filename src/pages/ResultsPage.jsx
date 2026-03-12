import { useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, FileText, ArrowLeft, Activity } from 'lucide-react';
import './ResultsPage.css';

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // Using an empty state fallback in case of direct navigation
  const query = location.state?.symptoms || 'General symptom inquiry';

  return (
    <div className="results-page animate-fade-in container">
      <button className="back-button" onClick={() => navigate('/checker')}>
        <ArrowLeft size={20} /> Back to checker
      </button>

      <div className="results-header">
        <h1>Analysis Results</h1>
        <p className="query-summary">Based on: "{query}"</p>
      </div>

      <div className="results-grid">
        <div className="result-card main-analysis">
          <div className="card-header">
            <Activity className="card-icon text-teal" />
            <h2>Preliminary Assessment</h2>
          </div>
          <div className="card-body">
            <div className="placeholder-content">
               <div className="skeleton-line full"></div>
               <div className="skeleton-line"></div>
               <div className="skeleton-line long"></div>
               <p className="placeholder-text">
                 This is a placeholder for the AI-generated medical analysis. 
                 In a fully implemented version, this section would contain a detailed breakdown 
                 of potential conditions based on the symptoms provided.
               </p>
               <div className="skeleton-line medium mt-4"></div>
               <div className="skeleton-line full"></div>
            </div>
          </div>
        </div>

        <div className="sidebar-cards">
          <div className="result-card alert-card">
            <div className="card-header warning">
              <AlertCircle className="card-icon text-warning" />
              <h2>Recommended Action</h2>
            </div>
            <div className="card-body">
              <p>Consider consulting a general physician if symptoms persist for more than 48 hours. Drink plenty of fluids.</p>
            </div>
          </div>

          <div className="result-card">
            <div className="card-header">
              <FileText className="card-icon text-info" />
              <h2>Next Steps</h2>
            </div>
            <div className="card-body">
              <ul className="next-steps-list">
                <li>Monitor your temperature daily</li>
                <li>Stay home and rest</li>
                <li>Stay hydrated</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
