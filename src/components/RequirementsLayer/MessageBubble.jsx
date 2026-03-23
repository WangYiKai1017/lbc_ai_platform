import React from 'react';
import './RequirementsLayer.css';

const MessageBubble = ({ message }) => {
  return (
    <div className={`message-bubble ${message.isUser ? 'user' : 'agent'}`}>
      <div className="message-content">
        {message.text}
      </div>
      <div className="message-time">
        {new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default MessageBubble;