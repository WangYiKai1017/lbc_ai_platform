import React from 'react';

const CharacterDetail = ({ character, onBack }) => {
  return (
    <div className="character-detail">
      <div className="detail-header">
        <button 
          className="detail-back-button"
          onClick={onBack}
          aria-label="返回列表"
        >
          ← 返回列表
        </button>
        <h2 className="detail-title">人物设定</h2>
      </div>

      <div className="detail-content">
        <div className="detail-section">
          <div className="detail-label">基本信息</div>
          <div className="detail-value">
            <div className="character-header">
              <img 
                src={character.avatar} 
                alt={character.name} 
                className="character-avatar"
              />
              <div className="character-info">
                <h3 className="character-name">{character.name}</h3>
                <p className="character-gender">性别：{character.gender}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <div className="detail-label">外表描述</div>
          <div className="detail-value">
            <p>{character.appearance}</p>
          </div>
        </div>

        <div className="detail-section">
          <div className="detail-label">人物简介</div>
          <div className="detail-value">
            <p>{character.fullBio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;