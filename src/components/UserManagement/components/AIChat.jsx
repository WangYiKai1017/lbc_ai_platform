import React, { useState } from 'react';

const AIChat = ({ isVisible, onToggle }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: '你好！我是你的AI助手，可以帮助你创建和完善角色设定。有什么需要我帮忙的吗？'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 添加用户消息
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: input.trim()
    };
    setMessages([...messages, newMessage]);
    setInput('');

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: '感谢你的提问！基于你的需求，我可以为你生成一个详细的角色设定。让我为你创建一个新角色...'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className={`ai-chat-container ${!isVisible ? 'hidden' : ''}`}>
      <div className="ai-chat-header">
        <h3 className="ai-chat-title">AI角色助手</h3>
        <button 
          className="ai-chat-close"
          onClick={onToggle}
          aria-label="关闭聊天"
        >
          ×
        </button>
      </div>

      <div className="ai-chat-messages">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={message.type === 'ai' ? 'ai-message' : 'user-message'}
          >
            <p className="message-content">{message.content}</p>
          </div>
        ))}
      </div>

      <form className="ai-chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="输入你的需求..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">发送</button>
      </form>
    </div>
  );
};

export default AIChat;