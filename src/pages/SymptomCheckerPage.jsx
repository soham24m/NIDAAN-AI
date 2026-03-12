import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Bot, User } from 'lucide-react';
import './SymptomCheckerPage.css';

export default function SymptomCheckerPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Namaste! I am Nidaan AI. Please tell me about the symptoms you are experiencing today in as much detail as possible.'
    }
  ]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { id: Date.now(), type: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    // Simulate thinking then navigate to results
    setTimeout(() => {
      navigate('/results', { state: { symptoms: input } });
    }, 1500);
  };

  return (
    <div className="checker-page animate-fade-in container">
      <div className="checker-container">
        <div className="checker-header">
          <h2>Symptom Assessment</h2>
          <p>Describe how you're feeling, and we'll analyze it.</p>
        </div>

        <div className="chat-area">
          <div className="messages-list">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-wrapper ${msg.type}`}>
                <div className="message-avatar">
                  {msg.type === 'bot' ? <Bot size={20} /> : <User size={20} />}
                </div>
                <div className="message-bubble">
                  {msg.content}
                </div>
              </div>
            ))}
            {messages.length > 1 && (
              <div className="message-wrapper bot">
                <div className="message-avatar">
                  <Bot size={20} />
                </div>
                <div className="message-bubble typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="input-area">
          <form onSubmit={handleSubmit} className="input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., I've had a mild fever and dry cough for 3 days..."
              className="symptom-input"
              disabled={messages.length > 1}
            />
            <button 
              type="submit" 
              className="submit-button"
              disabled={!input.trim() || messages.length > 1}
              aria-label="Analyze Symptoms"
            >
              <Send size={20} />
            </button>
          </form>
          <p className="disclaimer">
            Nidaan AI provides information, not a medical diagnosis. In an emergency, please visit a doctor immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
