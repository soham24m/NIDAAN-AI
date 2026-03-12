import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Bot, User, Mic, Image as ImageIcon, X } from 'lucide-react';
import './SymptomCheckerPage.css';

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

export default function SymptomCheckerPage() {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  
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
    const newMessages = [
      ...messages, 
      { 
        id: Date.now(), 
        type: 'user', 
        content: input,
        image: selectedImage
      }
    ];
    setMessages(newMessages);
    setInput('');
    setSelectedImage(null);

    // Simulate thinking then navigate to results
    setTimeout(() => {
      navigate('/results', { state: { symptoms: input, image: selectedImage } });
    }, 1500);
  };

  const handleMicClick = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Ideal to link this to the global language state, but kept simple
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev ? `${prev} ${transcript}` : transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="checker-page animate-fade-in container">
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

      <div className="checker-container glass-panel">
        <div className="checker-header">
          <h2>Symptom Assessment</h2>
          <p>Describe how you're feeling, and we'll analyze it.</p>
        </div>

        <div className="chat-area">
          <div className="messages-list">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-wrapper animate-slide-up ${msg.type}`}>
                <div className={`message-avatar ${msg.type === 'bot' ? 'glowing-avatar' : ''}`}>
                  {msg.type === 'bot' ? <Bot size={20} /> : <User size={20} />}
                </div>
                <div className="message-bubble glass-panel">
                  {msg.content}
                  {msg.image && (
                    <div className="message-image-container">
                      <img src={msg.image} alt="Uploaded symptom" className="message-image" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {messages.length > 1 && (
              <div className="message-wrapper animate-slide-up bot">
                <div className="message-avatar glowing-avatar">
                  <Bot size={20} />
                </div>
                <div className="message-bubble glass-panel typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="input-area">
          {selectedImage && (
            <div className="image-preview-area">
              <div className="image-preview-wrapper">
                <img src={selectedImage} alt="Preview" className="image-preview" />
                <button 
                  className="remove-image-btn" 
                  onClick={() => setSelectedImage(null)}
                  disabled={messages.length > 1}
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="input-form">
            <button 
              type="button" 
              className="icon-button"
              onClick={() => fileInputRef.current?.click()}
              disabled={messages.length > 1}
              title="Upload Image"
            >
              <ImageIcon size={20} />
            </button>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? "Listening..." : "e.g., I've had a mild fever and dry cough for 3 days..."}
              className={`symptom-input ${isListening ? 'listening' : ''}`}
              disabled={messages.length > 1}
            />
            
            <button 
              type="button" 
              className={`icon-button ${isListening ? 'active-mic' : ''}`}
              onClick={handleMicClick}
              disabled={messages.length > 1}
              title="Voice Input"
            >
              <Mic size={20} />
            </button>

            <button 
              type="submit" 
              className="submit-button"
              disabled={(!input.trim() && !selectedImage) || messages.length > 1}
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
