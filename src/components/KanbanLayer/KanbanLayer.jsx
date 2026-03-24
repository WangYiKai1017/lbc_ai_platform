import React, { useState } from 'react';
import './KanbanLayer.css';
import Lane from '../RequirementsLayer/Lane';
import StoryCardDetail from '../RequirementsLayer/StoryCardDetail';

const KanbanLayer = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  
  // 故事卡数据，分配到不同的泳道
  const [swimlanes, setSwimlanes] = useState([
    {
      id: 'ready-for-dev',
      title: 'Ready for Dev',
      cards: [
        {
          id: 'REQ-004',
          title: '用户反馈系统',
          summary: '实现用户反馈收集和管理功能',
          description: '开发用户反馈系统，包括反馈表单、列表展示、筛选和处理功能。',
          status: '待处理',
          assignee: { id: 'agent-4', name: '反馈Agent', avatar: '💬' },
          reporter: { id: 'user-3', name: '客户代表', avatar: '👥' },
          tags: ['用户反馈', '客户服务'],
          reportDate: '2026-03-24',
          dueDate: '2026-04-15',
          estimatedTime: '10d',
          actualTime: '',
          tokenUsage: '0',
          priority: '中',
          parentDependencies: [],
          childDependencies: [],
          checklist: [
            { text: '设计反馈表单', completed: false },
            { text: '实现反馈列表', completed: false },
            { text: '添加筛选功能', completed: false }
          ]
        },
        {
          id: 'REQ-005',
          title: '性能优化',
          summary: '优化系统性能，提升响应速度',
          description: '对系统进行性能分析和优化，提升页面加载速度和响应时间。',
          status: '待处理',
          assignee: { id: 'agent-5', name: '性能Agent', avatar: '⚡' },
          reporter: { id: 'user-4', name: '技术总监', avatar: '👨‍💼' },
          tags: ['性能优化', '技术'],
          reportDate: '2026-03-24',
          dueDate: '2026-04-20',
          estimatedTime: '8d',
          actualTime: '',
          tokenUsage: '0',
          priority: '高',
          parentDependencies: [],
          childDependencies: [],
          checklist: [
            { text: '性能分析', completed: false },
            { text: '代码优化', completed: false },
            { text: '数据库优化', completed: false }
          ]
        }
      ]
    },
    {
      id: 'in-dev',
      title: 'In Dev',
      cards: [
        {
          id: 'REQ-002',
          title: '数据可视化模块',
          summary: '创建图表和仪表盘来展示业务数据',
          description: '开发数据可视化模块，使用图表库展示各类业务数据，包括折线图、柱状图、饼图等。',
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
            { text: '实现数据导出功能', completed: false }
          ]
        }
      ]
    },
    {
      id: 'ready-for-test',
      title: 'Ready for Test',
      cards: [
        {
          id: 'REQ-001',
          title: '用户认证系统',
          summary: '实现用户注册、登录、忘记密码等功能',
          description: '开发一个完整的用户认证系统，包括注册、登录、密码重置、邮箱验证等功能。',
          status: '待测试',
          assignee: { id: 'agent-1', name: '认证Agent', avatar: '🔐' },
          reporter: { id: 'user-1', name: '产品经理', avatar: '👨' },
          tags: ['认证', '安全', '用户管理'],
          reportDate: '2026-03-20',
          dueDate: '2026-04-10',
          estimatedTime: '15d',
          actualTime: '12d',
          tokenUsage: '2000',
          priority: '高',
          parentDependencies: [],
          childDependencies: ['REQ-002', 'REQ-003'],
          checklist: [
            { text: '设计数据库模型', completed: true },
            { text: '实现用户注册功能', completed: true },
            { text: '实现用户登录功能', completed: true },
            { text: '实现密码重置功能', completed: true },
            { text: '添加邮箱验证', completed: true },
            { text: '集成JWT认证', completed: true }
          ]
        }
      ]
    },
    {
      id: 'in-test',
      title: 'In Test',
      cards: [
        {
          id: 'REQ-003',
          title: 'API接口开发',
          summary: '开发RESTful API接口供前端调用',
          description: '开发完整的RESTful API接口，支持前端所有功能需求。',
          status: '测试中',
          assignee: { id: 'agent-3', name: 'API开发Agent', avatar: '🔌' },
          reporter: { id: 'user-1', name: '产品经理', avatar: '👨' },
          tags: ['API', '后端', '接口'],
          reportDate: '2026-03-22',
          dueDate: '2026-04-05',
          estimatedTime: '12d',
          actualTime: '10d',
          tokenUsage: '2500',
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
      ]
    },
    {
      id: 'ready-for-deploy',
      title: 'Ready for Deploy',
      cards: []
    }
  ]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseDetail = () => {
    setSelectedCard(null);
  };

  // 拖动功能实现
  const [draggedCard, setDraggedCard] = useState(null);
  const [dragOverLaneId, setDragOverLaneId] = useState(null);

  const handleDragStart = (card) => {
    setDraggedCard(card);
  };

  const handleDragOver = (e, laneId) => {
    e.preventDefault();
    setDragOverLaneId(laneId);
  };

  const handleDragEnd = () => {
    if (draggedCard && dragOverLaneId) {
      // 更新卡片所在的泳道
      const newSwimlanes = swimlanes.map(lane => {
        // 从原泳道移除卡片
        if (lane.cards.some(card => card.id === draggedCard.id)) {
          return {
            ...lane,
            cards: lane.cards.filter(card => card.id !== draggedCard.id)
          };
        }
        // 添加到新泳道
        if (lane.id === dragOverLaneId) {
          // 根据泳道更新卡片状态
          let newStatus = draggedCard.status;
          switch (lane.id) {
            case 'ready-for-dev':
              newStatus = '待处理';
              break;
            case 'in-dev':
              newStatus = '进行中';
              break;
            case 'ready-for-test':
              newStatus = '待测试';
              break;
            case 'in-test':
              newStatus = '测试中';
              break;
            case 'ready-for-deploy':
              newStatus = '待部署';
              break;
          }
          
          return {
            ...lane,
            cards: [...lane.cards, { ...draggedCard, status: newStatus }]
          };
        }
        return lane;
      });
      
      setSwimlanes(newSwimlanes);
    }
    
    setDraggedCard(null);
    setDragOverLaneId(null);
  };

  return (
    <div className="kanban-layer">
      <div className="kanban-header">
        <h2>看板开发层</h2>
        <div className="kanban-info">
          <span>项目进度</span>
        </div>
      </div>
      
      <div className="kanban-content">
        {swimlanes.map(lane => (
          <div 
            key={lane.id} 
            className={`lane-wrapper ${dragOverLaneId === lane.id ? 'drag-over' : ''}`}
            onDragOver={(e) => handleDragOver(e, lane.id)}
          >
            <Lane
              title={lane.title}
              cards={lane.cards}
              onCardClick={handleCardClick}
              showAssignee={true}
              showWorkStatus={lane.id === 'in-dev' || lane.id === 'in-test'}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              draggedCardId={draggedCard?.id}
            />
          </div>
        ))}
      </div>
      
      {/* 故事卡详情弹窗 */}
      <StoryCardDetail card={selectedCard} onClose={handleCloseDetail} />
    </div>
  );
};

export default KanbanLayer;