import React, { useState, useEffect } from 'react';
import './RequirementsLayer.css';

const StoryCard = ({ card, onClick, showAssignee = true, onDragStart, onDragOver, onDragEnd, isDragging, isDragOver, showWorkStatus = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [currentMessages, setCurrentMessages] = useState([]);

  // 模拟agent工作信息
  const currentTaskItem = card.checklist?.find(item => !item.completed);
  const completedTasks = card.checklist?.filter(item => item.completed).length || 0;
  const totalTasks = card.checklist?.length || 1;
  const progress = Math.min(100, Math.floor((completedTasks / totalTasks) * 100));
  
  // 根据任务状态生成不同的模拟大模型反馈
  let mockMessages = [];
  
  if (card.status === '进行中') {
    if (currentTaskItem?.text.includes('支付')) {
      mockMessages = [
        `[INFO] 正在开发支付处理模块...`,
        `[DEBUG] 已连接到支付网关API`,
        `[INFO] 实现了支付请求参数验证功能`,
        `[DEBUG] 测试了微信支付接口，返回状态码: 200`,
        `[INFO] 实现了支付结果回调处理`,
        `[DEBUG] 正在处理支付状态同步逻辑...`
      ];
    } else if (currentTaskItem?.text.includes('物流')) {
      mockMessages = [
        `[INFO] 正在集成物流API接口...`,
        `[DEBUG] 已配置顺丰快递API密钥`,
        `[INFO] 实现了物流轨迹查询功能`,
        `[DEBUG] 测试了物流信息同步，响应时间: 120ms`,
        `[INFO] 正在处理物流状态更新机制...`
      ];
    } else {
      mockMessages = [
        `[INFO] 正在执行: ${currentTaskItem?.text || '无任务'}`,
        `[DEBUG] 检查数据库连接状态: 正常`,
        `[INFO] 完成了数据模型设计`,
        `[DEBUG] 测试了API接口，返回数据格式正确`,
        `[INFO] 正在优化代码性能...`
      ];
    }
  } else if (card.status === '测试中') {
    if (currentTaskItem?.text.includes('性能')) {
      mockMessages = [
        `[INFO] 正在进行性能测试 - 并发请求`,
        `[DEBUG] 启动了100个并发用户`,
        `[INFO] 平均响应时间: 150ms`,
        `[DEBUG] 峰值TPS: 85`,
        `[INFO] 内存占用: 450MB`,
        `[DEBUG] 检测到一个潜在的性能瓶颈...`
      ];
    } else if (currentTaskItem?.text.includes('安全')) {
      mockMessages = [
        `[INFO] 正在进行安全测试 - 权限验证`,
        `[DEBUG] 尝试未授权访问API接口`,
        `[INFO] 权限控制机制工作正常`,
        `[DEBUG] 检测到一个输入验证问题，已记录`,
        `[INFO] 正在测试数据加密功能...`
      ];
    } else {
      mockMessages = [
        `[INFO] 正在执行测试: ${currentTaskItem?.text || '无测试任务'}`,
        `[DEBUG] 运行了120个测试用例`,
        `[INFO] 测试通过率: 98%`,
        `[DEBUG] 发现2个bug，已提交到缺陷跟踪系统`,
        `[INFO] 正在生成测试报告...`
      ];
    }
  } else {
    mockMessages = [
      `[INFO] 任务状态: ${card.status}`,
      `[INFO] 已完成: ${completedTasks} / ${totalTasks} 任务项`,
      `[INFO] 当前进度: ${progress}%`
    ];
  }
  
  const agentWorkInfo = {
    currentTask: currentTaskItem?.text || '无正在执行的任务',
    currentAgent: card.assignee || { name: '未知Agent', avatar: '🤖' },
    progress: progress,
    messages: mockMessages
  };

  // 模拟实时消息更新
  useEffect(() => {
    if (showDetails && (card.status === '进行中' || card.status === '测试中')) {
      const interval = setInterval(() => {
        // 这里可以添加更多实时消息
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [showDetails, card.status]);

  return (
    <div
      className={`story-card-container ${isHovered ? 'hovered' : ''} ${isDragging ? 'dragging' : ''} ${isDragOver ? 'drag-over' : ''}`}
    >
      <div
        className="story-card"
        onClick={() => onClick(card)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        draggable
        onDragStart={() => onDragStart(card)}
        onDragOver={(e) => {
          if (onDragOver) {
            // 从card.status中解析出泳道ID
            let laneId = '';
            switch (card.status) {
              case '待处理':
                laneId = 'ready-for-dev';
                break;
              case '进行中':
                laneId = 'in-dev';
                break;
              case '待测试':
                laneId = 'ready-for-test';
                break;
              case '测试中':
                laneId = 'in-test';
                break;
              case '待部署':
                laneId = 'ready-for-deploy';
                break;
              default:
                laneId = 'ready-for-dev';
            }
            onDragOver(e, laneId, card.id);
          }
        }}
        onDragEnd={onDragEnd}
      >
        <div className="story-card-content">
          <div className="story-card-header">
            <div className="story-card-id">#{card.id}</div>
            <div className="story-card-status">{card.status}</div>
          </div>
          <div className="story-card-title">{card.title}</div>
          <div className="story-card-summary">{card.summary}</div>
        </div>
        {showAssignee && card.assignee && (
          <div className="story-card-footer">
            <div className="story-card-assignee">
              <span className="assignee-name">执行者：{card.assignee.name}</span>
              <div className="assignee-avatar">{card.assignee.avatar}</div>
            </div>
          </div>
        )}
      </div>

      {/* 工作状态动态窗口 - 仅在In Dev和In Test泳道显示 */}
      {(card.status === '进行中' || card.status === '测试中') && showWorkStatus && (
        <div className={`work-status-window ${showDetails ? 'expanded' : 'collapsed'}`}>
          <div className="work-status-header" onClick={(e) => {
            e.stopPropagation();
            setShowDetails(!showDetails);
          }}>
            <span className="work-status-title">Agent工作状态</span>
            <span className="work-status-toggle">{showDetails ? '▼' : '▶'}</span>
          </div>

          {showDetails && (
            <div className="work-status-content">
              {/* Agent信息行 */}
              <div className="agent-info">
                <span className="agent-avatar">{agentWorkInfo.currentAgent.avatar}</span>
                <span className="agent-name">正在执行: {agentWorkInfo.currentAgent.name}</span>
              </div>

              {/* 任务列表 */}
              <div className="task-list">
                {card.checklist?.map((task, index) => {
                  const isCurrentTask = task.text === agentWorkInfo.currentTask && !task.completed;
                  return (
                    <div key={index} className={`task-item ${task.completed ? 'completed' : isCurrentTask ? 'current' : 'active'}`}>
                      <div className="task-checkbox">
                        {isCurrentTask ? (
                          <img 
                            src="/src/assets/loading.gif" 
                            alt="Loading" 
                            className="current-task-gif"
                            width="16" 
                            height="16"
                          />
                        ) : (
                          <input type="checkbox" checked={task.completed} readOnly />
                        )}
                      </div>
                      <div className="task-text">{task.text}</div>
                    </div>
                  );
                })}
              </div>

              {/* 实时进度窗口 */}
              <div className="progress-window">
                <div className="progress-header">
                  <span className="progress-title">当前进度</span>
                </div>
                <div className="progress-content">
                  {agentWorkInfo.messages.map((message, index) => (
                    <div key={index} className="progress-message">
                      <span className="message-icon">🔄</span>
                      <span className="message-text">{message}</span>
                    </div>
                  ))}
                  {/* 动态文本框 - 用于展示SSE消息 */}
                          <div className="sse-message-box">
                            <div className="sse-message-content">
                              <span className="sse-message-prefix">实时日志:</span>
                              <span className="sse-message-text">
                                {card.status === '进行中' ? (
                                  <>• 正在执行数据库查询操作...<br />
                                  • 处理请求数据 - 250ms<br />
                                  • 生成响应结果 - 180ms<br />
                                  • 正在发送数据到前端...<br />
                                  • 等待用户确认...</>
                                ) : (
                                  <>• 正在执行UI自动化测试...<br />
                                  • 测试用例执行进度: 65%<br />
                                  • 通过测试: 128个<br />
                                  • 失败测试: 3个<br />
                                  • 正在生成测试报告...</>
                                )}
                              </span>
                            </div>
                          </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StoryCard;