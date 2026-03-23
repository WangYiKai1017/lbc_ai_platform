import React, { useState, useRef } from 'react';
import './RequirementsLayer.css';
import Lane from './Lane';
import StoryCardDetail from './StoryCardDetail';
import MessageBubble from './MessageBubble';

const RequirementsLayer = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, text: '你好！我是需求拆解助手，请问你有什么需求需要拆解？', isUser: false }
  ]);
  const [inputText, setInputText] = useState('');
  const [storyCards, setStoryCards] = useState([
    {
      id: 'REQ-001',
      title: '用户认证系统',
      summary: '实现用户注册、登录、忘记密码等功能',
      description: '开发一个完整的用户认证系统，包括注册、登录、密码重置、邮箱验证等功能。系统需要支持JWT认证，具备良好的安全性和用户体验。',
      status: '待处理',
      assignee: { id: 'agent-1', name: '认证Agent', avatar: '🔐' },
      reporter: { id: 'user-1', name: '产品经理', avatar: '👨' },
      tags: ['认证', '安全', '用户管理'],
      reportDate: '2026-03-20',
      dueDate: '2026-04-10',
      estimatedTime: '15d',
      actualTime: '',
      tokenUsage: '0',
      priority: '高',
      parentDependencies: [],
      childDependencies: ['REQ-002', 'REQ-003'],
      checklist: [
        { text: '设计数据库模型', completed: false },
        { text: '实现用户注册功能', completed: false },
        { text: '实现用户登录功能', completed: false },
        { text: '实现密码重置功能', completed: false },
        { text: '添加邮箱验证', completed: false },
        { text: '集成JWT认证', completed: false },
        { text: '编写单元测试', completed: false }
      ]
    },
    {
      id: 'REQ-002',
      title: '数据可视化模块',
      summary: '创建图表和仪表盘来展示业务数据',
      description: '开发数据可视化模块，使用图表库展示各类业务数据，包括折线图、柱状图、饼图等。模块需要支持数据筛选、导出和实时更新功能。',
      status: '进行中',
      assignee: { id: 'agent-2', name: '可视化Agent', avatar: '📊' },
      reporter: { id: 'user-2', name: '数据分析师', avatar: '👩' },
      tags: ['数据', '可视化', '图表'],
      reportDate: '2026-03-21',
      dueDate: '2026-04-20',
      estimatedTime: '20d',
      actualTime: '5d',
      tokenUsage: '1500',
      priority: '中',
      parentDependencies: ['REQ-001'],
      childDependencies: [],
      checklist: [
        { text: '选择图表库', completed: true },
        { text: '设计仪表盘布局', completed: true },
        { text: '实现基础图表组件', completed: true },
        { text: '添加数据筛选功能', completed: false },
        { text: '实现数据导出功能', completed: false },
        { text: '添加实时更新功能', completed: false }
      ]
    },
    {
      id: 'REQ-003',
      title: 'API接口开发',
      summary: '开发RESTful API接口供前端调用',
      description: '开发完整的RESTful API接口，支持前端所有功能需求。接口需要具备良好的文档、版本控制和错误处理机制。',
      status: '已完成',
      assignee: { id: 'agent-3', name: 'API开发Agent', avatar: '🔌' },
      reporter: { id: 'user-1', name: '产品经理', avatar: '👨' },
      tags: ['API', '后端', '接口'],
      reportDate: '2026-03-22',
      dueDate: '2026-04-05',
      estimatedTime: '12d',
      actualTime: '10d',
      tokenUsage: '2000',
      priority: '高',
      parentDependencies: ['REQ-001'],
      childDependencies: [],
      checklist: [
        { text: '设计API接口文档', completed: true },
        { text: '实现用户相关接口', completed: true },
        { text: '实现数据相关接口', completed: true },
        { text: '添加权限控制', completed: true },
        { text: '编写接口测试', completed: true },
        { text: '部署API服务', completed: true }
      ]
    }
  ]);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    
    const newMessage = { id: messages.length + 1, text: inputText, isUser: true };
    setMessages([...messages, newMessage]);
    setInputText('');

    // 模拟AI回复
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        text: '好的，我正在为您拆解需求...',
        isUser: false
      };
      setMessages([...messages, newMessage, aiMessage]);
    }, 1000);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseDetail = () => {
    setSelectedCard(null);
  };

  // 拖动功能实现
  const [draggedCard, setDraggedCard] = useState(null);
  const [dragOverCard, setDragOverCard] = useState(null);

  const handleDragStart = (card) => {
    setDraggedCard(card);
  };

  const handleDragOver = (e, card) => {
    e.preventDefault();
    setDragOverCard(card);
  };

  const handleDragEnd = () => {
    if (draggedCard && dragOverCard && draggedCard.id !== dragOverCard.id) {
      const newCards = [...storyCards];
      const draggedIndex = newCards.findIndex(card => card.id === draggedCard.id);
      const overIndex = newCards.findIndex(card => card.id === dragOverCard.id);
      
      // 移除拖动的卡片
      newCards.splice(draggedIndex, 1);
      // 插入到新位置
      newCards.splice(overIndex, 0, draggedCard);
      
      setStoryCards(newCards);
    }
    
    setDraggedCard(null);
    setDragOverCard(null);
  };

  return (
    <div className="requirements-layer">
      {/* 中间对话区域 */}
      <div className="conversation-area">
        <div className="conversation-header">
          <h2>需求拆解助手</h2>
        </div>
        <div className="conversation-messages">
          {messages.map(message => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
        <div className="conversation-input">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="请输入您的需求..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>发送</button>
        </div>
      </div>

      {/* 右侧泳道区域 */}
      <div className="lane-area">
        <Lane
          title="已拆解需求"
          cards={storyCards}
          onCardClick={handleCardClick}
          showAssignee={false}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          draggedCardId={draggedCard?.id}
          dragOverCardId={dragOverCard?.id}
        />
      </div>

      {/* 故事卡详情弹窗 */}
      <StoryCardDetail card={selectedCard} onClose={handleCloseDetail} />
    </div>
  );
};

export default RequirementsLayer;