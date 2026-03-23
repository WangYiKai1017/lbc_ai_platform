import React, { useState } from 'react';
import './RequirementsLayer.css';

const StoryCard = ({ card, onClick, showAssignee = true, onDragStart, onDragOver, onDragEnd, isDragging, isDragOver }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`story-card ${isHovered ? 'hovered' : ''} ${isDragging ? 'dragging' : ''} ${isDragOver ? 'drag-over' : ''}`}
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
  );
};

export default StoryCard;