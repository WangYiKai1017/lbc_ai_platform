import React, { useState, useEffect } from 'react';
import './RequirementsLayer.css';

const StoryCard = ({ card, onClick, showAssignee = true, onDragStart, onDragOver, onDragEnd, isDragging, isDragOver, showWorkStatus = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // 模拟agent工作信息
  const agentWorkInfo = {
    currentTask: card.checklist?.find(item => !item.completed)?.text || '无正在执行的任务',
    currentAgent: card.assignee || { name: '未知Agent', avatar: '🤖' },
    progress: Math.min(100, Math.floor((card.checklist?.filter(item => item.completed).length / (card.checklist?.length || 1)) * 100)),
    messages: [
      `正在执行: ${card.checklist?.find(item => !item.completed)?.text || '无任务'}`,
      '已完成: ' + (card.checklist?.filter(item => item.completed).length || 0) + ' / ' + (card.checklist?.length || 0) + ' 任务项',
      '当前进度: ' + Math.min(100, Math.floor((card.checklist?.filter(item => item.completed).length / (card.checklist?.length || 1)) * 100)) + '%'
    ]
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
        onDragOver={(e) => onDragOver(e, card)}
        onDragEnd={onDragEnd}
      >
        <div className="story-card-header">
          <div className="story-card-id">#{card.id}</div>
          <div className="story-card-status">{card.status}</div>
        </div>
        <div className="story-card-title">{card.title}</div>
        <div className="story-card-summary">{card.summary}</div>
        {showAssignee && card.assignee && (
          <div className="story-card-assignee">
            <div className="assignee-avatar">{card.assignee.avatar}</div>
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
                          <span className="current-task-icon">🔄</span>
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
                      <span className="sse-message-prefix">Agent:</span>
                      <span className="sse-message-text">正在处理中... (此区域将显示实时SSE消息)</span>
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