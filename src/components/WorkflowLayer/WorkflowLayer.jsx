import React, { useState, useRef, useEffect } from 'react';
import './WorkflowLayer.css';
import StoryCard from '../RequirementsLayer/StoryCard';

const WorkflowLayer = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [draggedNode, setDraggedNode] = useState(null); // 现在是对象: { id: string, offset: { x, y } }
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef(null);

  // 与看板开发层保持一致的故事卡数据
  // 重新布局：无父依赖卡片在最左侧，子节点向右，同级上下排列
  // 卡片尺寸：300x180，间距：左右=150px（宽的一半），上下=90px（高的一半）
  const storyCards = [
    // 第0列：无父依赖卡片
    {
      id: 'REQ-001',
      title: '用户认证系统',
      summary: '实现用户注册、登录、忘记密码等功能',
      status: '待测试',
      parentDependencies: [],
      childDependencies: ['REQ-002', 'REQ-003', 'REQ-008'],
      x: 100,         // 最左侧
      y: 100
    },
    {
      id: 'REQ-007',
      title: '报表系统',
      summary: '开发数据报表生成功能',
      status: '待处理',
      parentDependencies: [],
      childDependencies: ['REQ-002'],
      x: 100,         // 最左侧，与REQ-001同级，上下排列
      y: 370          // 100 + 180 + 90 = 370
    },
    
    // 第1列：REQ-001的子节点
    {
      id: 'REQ-002',
      title: '数据可视化模块',
      summary: '创建图表和仪表盘来展示业务数据',
      status: '进行中',
      parentDependencies: ['REQ-001', 'REQ-007'],
      childDependencies: ['REQ-004'],
      x: 550,         // 100 + 300 + 150 = 550
      y: 50
    },
    {
      id: 'REQ-003',
      title: 'API接口开发',
      summary: '开发RESTful API接口供前端调用',
      status: '测试中',
      parentDependencies: ['REQ-001'],
      childDependencies: ['REQ-005', 'REQ-006', 'REQ-009'],
      x: 550,         // 100 + 300 + 150 = 550
      y: 320          // 50 + 180 + 90 = 320
    },
    {
      id: 'REQ-008',
      title: '权限管理系统',
      summary: '实现基于角色的权限管理功能',
      status: '进行中',
      parentDependencies: ['REQ-001'],
      childDependencies: [],
      x: 550,         // 100 + 300 + 150 = 550
      y: 590          // 320 + 180 + 90 = 590
    },
    
    // 第2列：REQ-002和REQ-003的子节点
    {
      id: 'REQ-004',
      title: '用户反馈系统',
      summary: '实现用户反馈收集和管理功能',
      status: '待处理',
      parentDependencies: ['REQ-002'],
      childDependencies: [],
      x: 1000,        // 550 + 300 + 150 = 1000
      y: 0
    },
    {
      id: 'REQ-010',
      title: '前端界面开发',
      summary: '开发系统前端界面',
      status: '测试中',
      parentDependencies: ['REQ-003'],  // 上游改为REQ-003
      childDependencies: ['REQ-006'],     // 下游设置为REQ-006
      x: 1000,        // 550 + 300 + 150 = 1000
      y: 270          // 0 + 180 + 90 = 270
    },
    {
      id: 'REQ-005',
      title: '性能优化',
      summary: '优化系统性能，提升响应速度',
      status: '待处理',
      parentDependencies: ['REQ-003'],
      childDependencies: [],
      x: 1000,        // 550 + 300 + 150 = 1000
      y: 540          // 270 + 180 + 90 = 540
    },
    
    // 第3列：REQ-003的更多子节点
    {
      id: 'REQ-006',
      title: '通知系统',
      summary: '实现系统通知和消息推送功能',
      status: '待处理',
      parentDependencies: ['REQ-010'],  // 上游改为REQ-010
      childDependencies: [],
      x: 1450,        // 1000 + 300 + 150 = 1450
      y: 135
    },
    {
      id: 'REQ-009',
      title: '数据导入导出功能',
      summary: '实现数据的批量导入和导出功能',
      status: '待测试',
      parentDependencies: ['REQ-003'],
      childDependencies: [],
      x: 1450,        // 1000 + 300 + 150 = 1450
      y: 405          // 135 + 180 + 90 = 405
    },
    
    // 第4列：多依赖节点
    {
      id: 'REQ-011',
      title: '系统部署文档',
      summary: '编写系统部署和运维文档',
      status: '待部署',
      parentDependencies: ['REQ-001', 'REQ-003', 'REQ-010'],
      childDependencies: [],
      x: 1900,        // 1450 + 300 + 150 = 1900
      y: 270
    }
  ];

  // 初始化节点和边
  useEffect(() => {
    // 创建节点 - 调整高度确保边框完全可见
    // 边框粗度4px，所以总高度 = StoryCard高度(150px) + 边框粗度(4px) = 154px
    const newNodes = storyCards.map(card => ({
      id: card.id,
      title: card.title,
      status: card.status,
      x: card.x,
      y: card.y,
      width: 300,  // 宽度
      height: 150 + 8  // StoryCard高度(150px) + 边框粗度(4px)，确保边框完全显示
    }));

    // 创建边 - 使用新的generateEdges函数
    const newEdges = generateEdges(storyCards, newNodes);

    setNodes(newNodes);
    setEdges(newEdges);
  }, []);

  // 生成边的函数 - 可复用，支持曲线箭头
  const generateEdges = (cards, nodes) => {
    const edges = [];
    
    cards.forEach(card => {
      card.childDependencies.forEach(childId => {
        const parentNode = nodes.find(n => n.id === card.id);
        const childNode = nodes.find(n => n.id === childId);
        
        if (parentNode && childNode) {
          // 计算起点和终点 - 卡片边界中点
          const fromX = parentNode.x + parentNode.width;
          const fromY = parentNode.y + parentNode.height / 2;
          const toX = childNode.x;
          const toY = childNode.y + childNode.height / 2;
          
          // 计算控制点，使箭头呈现曲线
          const controlPointX = (fromX + toX) / 2 + 50; // 向右偏移50px，形成曲线
          
          edges.push({
            id: `${card.id}-${childId}`,
            from: card.id,
            to: childId,
            fromX,
            fromY,
            toX,
            toY,
            controlPointX,
            controlPointY: (fromY + toY) / 2
          });
        }
      });
    });
    
    return edges;
  };

  // 更新边的位置
  const updateEdges = (updatedNodes) => {
    const newEdges = generateEdges(storyCards, updatedNodes);
    setEdges(newEdges);
  };

  // 处理节点拖动开始
  const handleNodeDragStart = (e, nodeId) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    // 计算鼠标点击位置相对于节点左上角的偏移量
    const clickOffset = {
      x: e.clientX - rect.left - node.x,
      y: e.clientY - rect.top - node.y
    };
    
    setDraggedNode({ id: nodeId, offset: clickOffset });
    setIsDragging(true);
  };

  // 处理节点拖动
  const handleNodeDrag = (e) => {
    if (!isDragging || !draggedNode || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // 使用鼠标位置减去点击偏移量，得到节点的新位置
    const x = e.clientX - rect.left - draggedNode.offset.x;
    const y = e.clientY - rect.top - draggedNode.offset.y;

    const updatedNodes = nodes.map(node => {
      if (node.id === draggedNode.id) {
        return {
          ...node,
          x,
          y
        };
      }
      return node;
    });

    setNodes(updatedNodes);
    updateEdges(updatedNodes);
  };

  // 处理节点拖动结束
  const handleNodeDragEnd = () => {
    setIsDragging(false);
    setDraggedNode(null);
  };



  // 获取状态对应的颜色
  const getStatusColor = (status) => {
    switch (status) {
      case '待处理':
        return '#95a5a6';
      case '进行中':
        return '#3498db';
      case '待测试':
        return '#f39c12';
      case '测试中':
        return '#e67e22';
      case '待部署':
        return '#9b59b6';
      case '已完成':
        return '#2ecc71';
      default:
        return '#95a5a6';
    }
  };

  return (
    <div className="workflow-layer">
      <div className="workflow-header">
        <h2>工作编排层</h2>
        <div className="workflow-info">
          <span>项目进度：</span>
          <span className="progress-indicator">75%</span>
        </div>
      </div>

      <div className="workflow-content">
        <div className="canvas-container" ref={canvasRef}>
          <svg
            className="workflow-canvas"
            width="100%"
            height="100%"
          >
            {/* 绘制曲线边 */}
            {edges.map(edge => (
              <path
                key={edge.id}
                d={`M ${edge.fromX} ${edge.fromY} C ${edge.controlPointX} ${edge.controlPointY}, ${edge.controlPointX} ${edge.controlPointY}, ${edge.toX} ${edge.toY}`}
                stroke="#95a5a6"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead)"
              />
            ))}

            {/* 定义箭头标记 */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#95a5a6" />
              </marker>
            </defs>

            {/* 绘制节点 */}
            {nodes.map(node => {
              const card = storyCards.find(c => c.id === node.id);
              return (
                <foreignObject
                  key={node.id}
                  x={node.x}
                  y={node.y}
                  width={node.width}
                  height={node.height}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleNodeDragStart(e, node.id);
                  }}
                  onMouseMove={handleNodeDrag}
                  onMouseUp={handleNodeDragEnd}
                  onMouseLeave={handleNodeDragEnd}
                  className="node-group"
                >
                  <div className="workflow-story-card" data-status={card.status}>
                    <StoryCard
                      card={card}
                      onClick={() => {}}
                      showAssignee={false}
                      showWorkStatus={false}
                    />
                  </div>
                </foreignObject>
              );
            })}
          </svg>
        </div>

        <div className="legend">
          <h3>图例</h3>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#2ecc71' }}></div>
            <span>已完成</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#3498db' }}></div>
            <span>进行中</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#f39c12' }}></div>
            <span>待测试</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#95a5a6' }}></div>
            <span>待处理</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowLayer;