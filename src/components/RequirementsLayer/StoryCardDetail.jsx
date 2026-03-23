import React, { useState } from 'react';
import './RequirementsLayer.css';

const StoryCardDetail = ({ card, onClose }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: { id: 'user-1', name: '张三', avatar: '👨' },
      text: '这个需求很清晰，我会尽快开始处理。',
      timestamp: '2026-03-23 10:30',
      editable: false
    },
    {
      id: 2,
      author: { id: 'user-2', name: '李四', avatar: '👩' },
      text: '需要注意和现有的用户认证系统集成。',
      timestamp: '2026-03-23 11:45',
      editable: false
    }
  ]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');

  if (!card) return null;

  const handleAddComment = () => {
    if (commentText.trim() === '') return;

    const newComment = {
      id: comments.length + 1,
      author: { id: 'current-user', name: '当前用户', avatar: '👤' },
      text: commentText,
      timestamp: new Date().toLocaleString('zh-CN'),
      editable: true
    };

    setComments([...comments, newComment]);
    setCommentText('');
  };

  const handleEditComment = (commentId, text) => {
    setEditingCommentId(commentId);
    setEditingCommentText(text);
  };

  const handleSaveComment = (commentId) => {
    if (editingCommentText.trim() === '') return;

    const updatedComments = comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, text: editingCommentText, timestamp: new Date().toLocaleString('zh-CN') }
        : comment
    );

    setComments(updatedComments);
    setEditingCommentId(null);
    setEditingCommentText('');
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '待处理': return '#f39c12';
      case '进行中': return '#3498db';
      case '已完成': return '#2ecc71';
      default: return '#95a5a6';
    }
  };

  return (
    <div className="story-card-detail-overlay">
      <div className="story-card-detail">
        <div className="story-card-detail-header">
          <div className="story-card-detail-top">
            <div className="story-card-detail-id">{card.id}</div>
            <div 
              className="story-card-detail-status"
              style={{ backgroundColor: getStatusColor(card.status) }}
            >
              {card.status}
            </div>
          </div>
          <button className="story-card-detail-close" onClick={onClose}>×</button>
        </div>

        <div className="story-card-detail-content">
          <div className="story-card-detail-left">
            <div className="story-card-detail-title">{card.title}</div>
            <div className="story-card-detail-summary">
              <h3>摘要</h3>
              <p>{card.summary}</p>
            </div>
            <div className="story-card-detail-description">
              <h3>详情</h3>
              <p>{card.description || '暂无详细描述'}</p>
            </div>
            <div className="story-card-detail-checklist">
              <h3>工作项</h3>
              <div className="checklist-items">
                {card.checklist?.map((item, index) => (
                  <div key={index} className="checklist-item">
                    <input type="checkbox" checked={item.completed} readOnly />
                    <span>{item.text}</span>
                  </div>
                )) || (
                  <p className="empty-state">暂无工作项</p>
                )}
              </div>
            </div>
            <div className="story-card-detail-comments">
              <h3>评论 ({comments.length})</h3>
              <div className="comments-list">
                {comments.map(comment => (
                  <div key={comment.id} className="comment-item">
                    <div className="comment-avatar">{comment.author.avatar}</div>
                    <div className="comment-content">
                      <div className="comment-header">
                        <span className="comment-author">{comment.author.name}</span>
                        <span className="comment-timestamp">{comment.timestamp}</span>
                      </div>
                      {editingCommentId === comment.id ? (
                        <div className="comment-edit">
                          <textarea
                            value={editingCommentText}
                            onChange={(e) => setEditingCommentText(e.target.value)}
                            rows={3}
                          />
                          <div className="comment-edit-actions">
                            <button onClick={() => handleSaveComment(comment.id)}>保存</button>
                            <button onClick={() => setEditingCommentId(null)}>取消</button>
                          </div>
                        </div>
                      ) : (
                        <div className="comment-text">{comment.text}</div>
                      )}
                      {comment.editable && editingCommentId !== comment.id && (
                        <div className="comment-actions">
                          <button onClick={() => handleEditComment(comment.id, comment.text)}>修改</button>
                          <button onClick={() => handleDeleteComment(comment.id)}>删除</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="comment-input-area">
                <textarea
                  placeholder="添加评论..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={3}
                />
                <div className="comment-input-actions">
                  <button onClick={handleAddComment}>发表评论</button>
                </div>
              </div>
            </div>
          </div>

          <div className="story-card-detail-right">
            <div className="story-card-detail-info">
              <div className="info-section">
                <h4>工作者</h4>
                <div className="info-item">
                  <div className="info-avatar">{card.assignee?.avatar || '👤'}</div>
                  <span>{card.assignee?.name || '未分配'}</span>
                </div>
              </div>
              
              <div className="info-section">
                <h4>报告者</h4>
                <div className="info-item">
                  <div className="info-avatar">{card.reporter?.avatar || '👤'}</div>
                  <span>{card.reporter?.name || '未知'}</span>
                </div>
              </div>
              
              <div className="info-section">
                <h4>标签</h4>
                <div className="tags-container">
                  {card.tags?.map((tag, index) => (
                    <div key={index} className="tag">{tag}</div>
                  )) || (
                    <span className="empty-state">无标签</span>
                  )}
                </div>
              </div>
              
              <div className="info-section">
                <h4>报告日期</h4>
                <div className="info-item">{card.reportDate || '未设置'}</div>
              </div>
              
              <div className="info-section">
                <h4>截止日期</h4>
                <div className="info-item">{card.dueDate || '未设置'}</div>
              </div>
              
              <div className="info-section">
                <h4>预计耗时</h4>
                <div className="info-item">{card.estimatedTime || '未设置'}</div>
              </div>
              
              <div className="info-section">
                <h4>实际耗时</h4>
                <div className="info-item">{card.actualTime || '未设置'}</div>
              </div>
              
              <div className="info-section">
                <h4>消耗token量</h4>
                <div className="info-item">{card.tokenUsage || '0'}</div>
              </div>
              
              <div className="info-section">
                <h4>优先级</h4>
                <div className="info-item">{card.priority || '未设置'}</div>
              </div>
              
              <div className="info-section">
                <h4>父级依赖</h4>
                <div className="dependencies">
                  {card.parentDependencies?.map((dep, index) => (
                    <div key={index} className="dependency-item">{dep}</div>
                  )) || (
                    <span className="empty-state">无依赖</span>
                  )}
                </div>
              </div>
              
              <div className="info-section">
                <h4>子级依赖</h4>
                <div className="dependencies">
                  {card.childDependencies?.map((dep, index) => (
                    <div key={index} className="dependency-item">{dep}</div>
                  )) || (
                    <span className="empty-state">无依赖</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCardDetail;