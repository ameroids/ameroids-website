import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Elara. How can I help you today?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages(prev => [...prev, { text: inputText, sender: 'user' }]);
    setInputText('');

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thank you for your message! Our team at Ameroids Tech Studio is always here to assist.", 
        sender: 'bot' 
      }]);
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-title">
              <div className="chatbot-avatar-small">
                <img src="/chatbot.png" alt="Elara" />
              </div>
              Elara
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close Chat">
              ×
            </button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-message ${msg.sender === 'user' ? 'message-user' : 'message-bot'}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="chatbot-input-area" onSubmit={handleSubmit}>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..." 
              className="chatbot-input"
            />
            <button type="submit" className="chatbot-send">Send</button>
          </form>
        </div>
      )}
      
      {!isOpen && (
        <div className="chatbot-banner-trigger" onClick={() => setIsOpen(true)}>
          <div className="chatbot-banner-pill">
            <h2 className="chatbot-banner-title">
              Chat with <span>Elara</span>
            </h2>
            <div className="chatbot-banner-divider">
              <span className="divider-star"></span>
            </div>
            <p className="chatbot-banner-subtitle">
              Your AI Assistant is online <span className="online-dot"></span>
            </p>
          </div>
          <div className="chatbot-banner-circle-wrapper">
            <div className="circle-outer">
              <div className="circle-inner">
                <img src="/chatbot.png" alt="Elara Avatar" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
