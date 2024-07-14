import React, { useState, useEffect, useRef } from 'react';
import './ChatBox.css'; // Assuming you have a CSS file for styling

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    const newMessage = {
      text: input,
      isPersonal: true,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    callApi(newMessage.text);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const callApi = async (message) => {
    try {
      const response = await fetch("https://medihacks-1.onrender.com/chat", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "prompt":message })
      });

      if (response.ok) {
        const data = await response.json();
        const apiMessage = {
          text: data.response,
          isPersonal: false,
          timestamp: new Date().toLocaleTimeString()
        };
        console.log(data.message)
        setMessages((prevMessages) => [...prevMessages, apiMessage]);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  return (
    <div className="chat">
      <div className="chat-title">
        <h1>Fabio Ottaviani</h1>
        <h2>Supah</h2>
        <figure className="avatar">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" alt="avatar" />
        </figure>
      </div>
      <div className="messages">
        <div className="messages-content">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.isPersonal ? 'message-personal' : 'new'}`}>
              {!msg.isPersonal && (
                <figure className="avatar">
                  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" alt="avatar" />
                </figure>
              )}
              {msg.text}
              {msg.timestamp && <div className="timestamp">{msg.timestamp}</div>}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="message-box">
        <textarea
          type="text"
          className="message-input"
          placeholder="Type message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button type="submit" className="message-submit" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
