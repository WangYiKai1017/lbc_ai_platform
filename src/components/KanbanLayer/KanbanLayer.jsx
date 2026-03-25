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
          assignee: { id: 'agent-4', name: '开发agent - 前端', avatar: '💬' },
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
            { text: '添加筛选功能', completed: false },
            { text: '实现反馈处理流程', completed: false }
          ]
        },
        {
          id: 'REQ-005',
          title: '性能优化',
          summary: '优化系统性能，提升响应速度',
          description: '对系统进行性能分析和优化，提升页面加载速度和响应时间。',
          status: '待处理',
          assignee: { id: 'agent-5', name: '开发agent - 后端', avatar: '⚡' },
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
            { text: '数据库优化', completed: false },
            { text: '缓存策略优化', completed: false }
          ]
        },
        {
          id: 'REQ-006',
          title: '通知系统',
          summary: '实现系统通知和消息推送功能',
          description: '开发通知系统，支持站内消息、邮件通知和推送通知。',
          status: '待处理',
          assignee: { id: 'agent-6', name: '开发agent - 后端', avatar: '🔔' },
          reporter: { id: 'user-5', name: '产品经理', avatar: '👩‍💼' },
          tags: ['通知', '消息', '推送'],
          reportDate: '2026-03-25',
          dueDate: '2026-04-12',
          estimatedTime: '7d',
          actualTime: '',
          tokenUsage: '0',
          priority: '中',
          parentDependencies: [],
          childDependencies: [],
          checklist: [
            { text: '设计通知模型', completed: false },
            { text: '实现站内消息', completed: false },
            { text: '集成邮件服务', completed: false },
            { text: '实现推送通知', completed: false }
          ]
        },
        {
          id: 'REQ-007',
          title: '报表系统',
          summary: '开发数据报表生成功能',
          description: '实现各类业务数据的报表生成和导出功能。',
          status: '待处理',
          assignee: { id: 'agent-7', name: '开发agent - 前端', avatar: '📈' },
          reporter: { id: 'user-6', name: '数据分析师', avatar: '👨‍💻' },
          tags: ['报表', '数据分析', '导出'],
          reportDate: '2026-03-25',
          dueDate: '2026-04-25',
          estimatedTime: '12d',
          actualTime: '',
          tokenUsage: '0',
          priority: '中',
          parentDependencies: ['REQ-002'],
          childDependencies: [],
          checklist: [
            { text: '设计报表模板', completed: false },
            { text: '实现数据查询', completed: false },
            { text: '开发报表生成', completed: false },
            { text: '添加导出功能', completed: false }
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
          assignee: { id: 'agent-2', name: '开发agent - 前端', avatar: '📊' },
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
            { text: '优化图表性能', completed: false }
          ]
        },
        {
          id: 'REQ-008',
          title: '权限管理系统',
          summary: '实现基于角色的权限管理功能',
          description: '开发RBAC权限管理系统，支持角色定义、权限分配和访问控制。',
          status: '进行中',
          assignee: { id: 'agent-8', name: '开发agent - 后端', avatar: '🔑' },
          reporter: { id: 'user-7', name: '系统管理员', avatar: '🛡️' },
          tags: ['权限', '安全', '管理'],
          reportDate: '2026-03-23',
          dueDate: '2026-04-18',
          estimatedTime: '15d',
          actualTime: '3d',
          tokenUsage: '1200',
          priority: '高',
          parentDependencies: ['REQ-001'],
          childDependencies: [],
          checklist: [
            { text: '设计权限模型', completed: true },
            { text: '实现角色管理', completed: true },
            { text: '开发权限分配', completed: false },
            { text: '集成API权限控制', completed: false },
            { text: '添加权限审计', completed: false }
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
          assignee: { id: 'agent-1', name: '开发agent - 后端', avatar: '🔐' },
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
        },
        {
          id: 'REQ-009',
          title: '数据导入导出功能',
          summary: '实现数据的批量导入和导出功能',
          description: '开发数据导入导出模块，支持Excel、CSV等格式的数据处理。',
          status: '待测试',
          assignee: { id: 'agent-9', name: '开发agent - 后端', avatar: '💾' },
          reporter: { id: 'user-8', name: '数据管理员', avatar: '📂' },
          tags: ['数据', '导入', '导出'],
          reportDate: '2026-03-22',
          dueDate: '2026-04-08',
          estimatedTime: '10d',
          actualTime: '8d',
          tokenUsage: '1800',
          priority: '中',
          parentDependencies: [],
          childDependencies: [],
          checklist: [
            { text: '设计数据格式', completed: true },
            { text: '实现数据导入', completed: true },
            { text: '实现数据导出', completed: true },
            { text: '添加数据验证', completed: true },
            { text: '优化性能', completed: true }
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
          assignee: { id: 'agent-3', name: '测试agent - 接口', avatar: '🧪' },
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
            { text: '单元测试 - 用户接口', completed: true },
            { text: '单元测试 - 数据接口', completed: true },
            { text: '集成测试 - API组合', completed: true },
            { text: '性能测试 - 并发请求', completed: false },
            { text: '安全测试 - 权限验证', completed: false },
            { text: '接口文档验证', completed: false }
          ]
        },
        {
          id: 'REQ-010',
          title: '前端界面开发',
          summary: '开发系统前端界面',
          description: '实现系统的前端界面，包括布局、组件和交互效果。',
          status: '测试中',
          assignee: { id: 'agent-10', name: '测试agent - UI', avatar: '🎨' },
          reporter: { id: 'user-9', name: '前端开发', avatar: '💻' },
          tags: ['前端', 'UI', '界面'],
          reportDate: '2026-03-21',
          dueDate: '2026-04-15',
          estimatedTime: '25d',
          actualTime: '20d',
          tokenUsage: '3000',
          priority: '高',
          parentDependencies: ['REQ-001', 'REQ-002'],
          childDependencies: [],
          checklist: [
            { text: 'UI组件测试', completed: true },
            { text: '页面布局测试', completed: true },
            { text: '交互功能测试', completed: true },
            { text: '响应式测试', completed: false },
            { text: '浏览器兼容性测试', completed: false },
            { text: '性能测试 - 页面加载', completed: false }
          ]
        }
      ]
    },
    {
      id: 'ready-for-deploy',
      title: 'Ready for Deploy',
      cards: [
        {
          id: 'REQ-011',
          title: '系统部署文档',
          summary: '编写系统部署和运维文档',
          description: '创建系统部署指南、配置说明和运维手册。',
          status: '待部署',
          assignee: { id: 'agent-11', name: '开发agent - 文档', avatar: '📄' },
          reporter: { id: 'user-10', name: '运维工程师', avatar: '🔧' },
          tags: ['文档', '部署', '运维'],
          reportDate: '2026-03-25',
          dueDate: '2026-04-06',
          estimatedTime: '5d',
          actualTime: '5d',
          tokenUsage: '500',
          priority: '中',
          parentDependencies: [],
          childDependencies: [],
          checklist: [
            { text: '编写部署指南', completed: true },
            { text: '创建配置说明', completed: true },
            { text: '编写运维手册', completed: true },
            { text: '审核文档完整性', completed: true },
            { text: '文档版本控制', completed: true }
          ]
        }
      ]
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
  const [dragOverCardId, setDragOverCardId] = useState(null);

  const handleDragStart = (card) => {
    setDraggedCard(card);
  };

  const handleDragOver = (e, laneId, cardId = null) => {
    e.preventDefault();
    setDragOverLaneId(laneId);
    setDragOverCardId(cardId);
  };

  const handleDragEnd = () => {
    if (draggedCard && dragOverLaneId) {
      const newSwimlanes = swimlanes.map(lane => {
        // 处理原泳道（移除卡片）
        if (lane.cards.some(card => card.id === draggedCard.id)) {
          const updatedCards = lane.cards.filter(card => card.id !== draggedCard.id);
          
          // 如果是同一泳道，调整顺序
          if (lane.id === dragOverLaneId) {
            // 根据拖动位置插入卡片
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
            
            const updatedCard = { ...draggedCard, status: newStatus };
            
            // 如果没有指定拖拽目标位置，添加到末尾
            if (!dragOverCardId) {
              return {
                ...lane,
                cards: [...updatedCards, updatedCard]
              };
            }
            
            // 找到拖拽目标位置并插入
            const targetIndex = updatedCards.findIndex(card => card.id === dragOverCardId);
            if (targetIndex !== -1) {
              const newCards = [...updatedCards];
              newCards.splice(targetIndex, 0, updatedCard);
              return {
                ...lane,
                cards: newCards
              };
            }
            
            // 默认添加到末尾
            return {
              ...lane,
              cards: [...updatedCards, updatedCard]
            };
          }
          
          // 如果是不同泳道，只移除卡片
          return {
            ...lane,
            cards: updatedCards
          };
        }
        
        // 处理目标泳道（添加卡片）
        if (lane.id === dragOverLaneId && !lane.cards.some(card => card.id === draggedCard.id)) {
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
          
          const updatedCard = { ...draggedCard, status: newStatus };
          
          // 如果没有指定拖拽目标位置，添加到末尾
          if (!dragOverCardId) {
            return {
              ...lane,
              cards: [...lane.cards, updatedCard]
            };
          }
          
          // 找到拖拽目标位置并插入
          const targetIndex = lane.cards.findIndex(card => card.id === dragOverCardId);
          if (targetIndex !== -1) {
            const newCards = [...lane.cards];
            newCards.splice(targetIndex, 0, updatedCard);
            return {
              ...lane,
              cards: newCards
            };
          }
          
          // 默认添加到末尾
          return {
            ...lane,
            cards: [...lane.cards, updatedCard]
          };
        }
        
        return lane;
      });
      
      setSwimlanes(newSwimlanes);
    }
    
    setDraggedCard(null);
    setDragOverLaneId(null);
    setDragOverCardId(null);
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
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              draggedCardId={draggedCard?.id}
              dragOverCardId={dragOverCardId}
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