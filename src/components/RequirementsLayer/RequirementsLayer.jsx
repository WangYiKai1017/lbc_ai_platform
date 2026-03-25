import React, { useState, useRef } from 'react';
import './RequirementsLayer.css';
import Lane from './Lane';
import StoryCardDetail from './StoryCardDetail';
import MessageBubble from './MessageBubble';

const RequirementsLayer = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, text: '你好！我是需求拆解助手，请问你有什么需求需要拆解？', isUser: false },
    { id: 2, text: '我需要开发一个电商订单管理系统，主要功能包括用户下单、订单处理、库存管理和数据分析功能。系统需要支持多平台接入，并且要有良好的扩展性。', isUser: true },
    { id: 3, text: '感谢您提供的需求！我将为您进行详细的需求拆解。首先，让我理解这个电商订单管理系统的核心需求：\n\n1. **用户下单功能**：用户可以浏览商品、添加到购物车、提交订单\n2. **订单处理流程**：包括订单审核、支付处理、物流跟踪等\n3. **库存管理**：实时更新库存、库存预警、库存调拨\n4. **数据分析**：销售报表、订单分析、用户行为分析\n5. **多平台接入**：支持Web、移动端、API等多种接入方式\n6. **扩展性**：系统架构需要支持未来功能扩展\n\n基于以上理解，我将为您生成以下故事卡：', isUser: false },
    { id: 4, text: '### 系统架构建议\n\n为了满足您的需求，我建议采用以下系统架构：\n\n- **前端层**：采用React + TypeScript构建单页面应用，支持响应式设计\n- **后端层**：使用Node.js + Express.js构建RESTful API\n- **数据库**：MySQL存储结构化数据，Redis缓存热点数据\n- **中间件**：使用RabbitMQ处理异步任务，如订单通知、物流同步\n- **支付集成**：对接微信支付、支付宝等主流支付渠道\n- **物流集成**：对接顺丰、京东物流等API接口\n\n这种架构设计能够很好地支持多平台接入和系统扩展性要求。', isUser: false },
    { id: 5, text: '### 核心功能模块拆解\n\n现在，让我为您详细拆解各个核心功能模块：\n\n**1. 用户下单模块**\n- 商品浏览与搜索\n- 购物车管理\n- 订单确认与提交\n- 支付接口集成\n\n**2. 订单处理模块**\n- 订单状态管理\n- 订单审核流程\n- 支付结果处理\n- 物流信息同步\n- 订单通知机制\n\n**3. 库存管理模块**\n- 实时库存更新\n- 库存预警系统\n- 库存调拨功能\n- 库存盘点管理\n\n**4. 数据分析模块**\n- 销售报表生成\n- 订单数据分析\n- 用户行为分析\n- 数据可视化展示\n\n**5. 系统管理模块**\n- 用户权限管理\n- 系统配置管理\n- 日志管理\n- 系统监控\n\n这些模块将构成一个完整的电商订单管理系统，满足您的业务需求。', isUser: false },
    { id: 6, text: '### 技术实现细节\n\n针对核心功能，我建议采用以下技术实现方案：\n\n**1. 前端技术栈**\n- React 18 + TypeScript\n- Ant Design 组件库\n- Redux Toolkit 状态管理\n- Axios 网络请求\n- ECharts 数据可视化\n\n**2. 后端技术栈**\n- Node.js 18 + Express.js 4\n- TypeORM 数据库ORM\n- JWT 身份认证\n- Redis 缓存\n- RabbitMQ 消息队列\n\n**3. 部署方案**\n- Docker 容器化部署\n- Kubernetes 集群管理\n- Nginx 负载均衡\n- CI/CD 自动化部署\n\n这种技术选型既考虑了系统的性能和扩展性，也考虑了开发效率和维护成本。', isUser: false }
  ]);
  const [inputText, setInputText] = useState('');
  const [storyCards, setStoryCards] = useState([
    {
      id: 'ORD-001',
      title: '用户下单功能',
      summary: '实现用户浏览商品、添加购物车、提交订单的完整流程',
      description: '开发用户下单模块，包括商品浏览、购物车管理、订单提交等核心功能。支持商品搜索、筛选、详情查看，购物车添加/删除/修改数量，以及订单确认和提交。',
      status: '待处理',
            assignee: { id: 'agent-1', name: '开发agent - 后端', avatar: '🛒' },
      reporter: { id: 'user-1', name: '产品经理', avatar: '👨' },
      tags: ['订单', '用户', '购物车'],
      reportDate: '2026-03-20',
      dueDate: '2026-04-10',
      estimatedTime: '20d',
      actualTime: '',
      tokenUsage: '3000',
      priority: '高',
      parentDependencies: [],
      childDependencies: [],
      checklist: [
        { text: '设计商品浏览界面', completed: false },
        { text: '实现商品搜索和筛选', completed: false },
        { text: '开发购物车管理功能', completed: false },
        { text: '实现订单确认页面', completed: false },
        { text: '开发订单提交接口', completed: false },
        { text: '添加订单支付集成', completed: false }
      ]
    },
    {
      id: 'ORD-002',
      title: '订单处理流程',
      summary: '实现订单审核、支付处理、物流跟踪等后端处理流程',
      description: '开发订单处理模块，包括订单状态管理、支付处理、物流信息同步等功能。支持订单审核、支付确认、发货处理、物流跟踪信息更新等操作。',
      status: '进行中',
            assignee: { id: 'agent-2', name: '开发agent - 后端', avatar: '📋' },
      reporter: { id: 'user-2', name: '运营经理', avatar: '👩' },
      tags: ['订单', '流程', '物流'],
      reportDate: '2026-03-21',
      dueDate: '2026-04-15',
      estimatedTime: '25d',
      actualTime: '5d',
      tokenUsage: '4000',
      priority: '高',
      parentDependencies: ['ORD-001'],
      childDependencies: [],
      checklist: [
        { text: '设计订单状态流转图', completed: true },
        { text: '实现订单审核功能', completed: true },
        { text: '开发支付处理模块', completed: false },
        { text: '集成物流API接口', completed: false },
        { text: '实现订单状态通知', completed: false }
      ]
    },
    {
      id: 'ORD-003',
      title: '库存管理系统',
      summary: '实现实时库存更新、库存预警、库存调拨等功能',
      description: '开发库存管理模块，包括商品库存实时更新、库存预警机制、库存调拨功能等。支持库存查询、库存盘点、库存调整等操作。',
      status: '已完成',
            assignee: { id: 'agent-3', name: '开发agent - 后端', avatar: '📦' },
      reporter: { id: 'user-3', name: '库存经理', avatar: '👨' },
      tags: ['库存', '管理', '预警'],
      reportDate: '2026-03-22',
      dueDate: '2026-04-20',
      estimatedTime: '18d',
      actualTime: '18d',
      tokenUsage: '2500',
      priority: '高',
      parentDependencies: ['ORD-001'],
      childDependencies: [],
      checklist: [
        { text: '设计库存数据库模型', completed: true },
        { text: '实现库存实时更新', completed: true },
        { text: '开发库存预警功能', completed: true },
        { text: '实现库存调拨流程', completed: true },
        { text: '添加库存盘点功能', completed: true },
        { text: '编写单元测试', completed: true }
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
      {/* 左侧内容区域 */}
      <div className="left-content">
        {/* 对话展示区域 */}
        <div className="conversation-area">
          <div className="conversation-header">
            <h2>需求拆解助手</h2>
          </div>
          <div className="conversation-messages">
            {messages.map(message => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>
        </div>

        {/* 输入区域 */}
        <div className="input-area">
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