import { useState, useRef, useEffect } from 'react';
import { searchKnowledge } from '../data/chatbotKnowledge.js';
import './Chatbot.css';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
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
  }, [messages, isTyping]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText;
    setMessages(prev => [...prev, { text: userText, sender: 'user' }]);
    setInputText('');
    setIsTyping(true);

    // Call the local search engine which simulates processing large data
    const aiResponse = await searchKnowledge(userText);
    
    setMessages(prev => [...prev, { 
      text: aiResponse, 
      sender: 'bot' 
    }]);
    setIsTyping(false);
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
                {msg.text.split('\n').map((line, j) => (
                  <span key={j}>
                    {line}
                    <br />
                  </span>
                ))}
              </div>
            ))}
            
            {isTyping && (
              <div className="chatbot-message message-bot typing-indicator">
                <span></span><span></span><span></span>
              </div>
            )}
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
