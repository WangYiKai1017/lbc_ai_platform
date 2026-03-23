import React from 'react';
import './RequirementsLayer.css';
import StoryCard from './StoryCard';

const Lane = ({ title, cards, onCardClick, showAssignee = true, onDragStart, onDragOver, onDragEnd, draggedCardId, dragOverCardId }) => {
  return (
    <div className="lane">
      <div className="lane-header">
        <h3 className="lane-title">{title}</h3>
        <div className="lane-count">{cards.length}</div>
      </div>
      <div className="lane-content">
        {cards.map(card => (
          <StoryCard
            key={card.id}
            card={card}
            onClick={onCardClick}
            showAssignee={showAssignee}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            isDragging={card.id === draggedCardId}
            isDragOver={card.id === dragOverCardId}
          />
        ))}
      </div>
    </div>
  );
};

export default Lane;