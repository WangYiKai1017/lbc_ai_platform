import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NovelEditor.css';
import CharacterManager from '../CharacterManager/CharacterManager';
import NavigationPage from './pages/NavigationPage';
import DetailsPage from './pages/DetailsPage';
import HelpPage from './pages/HelpPage';
import InnovationPage from './pages/InnovationPage';

function NovelEditor({ page = 'editor' }) {
  const currentPage = page;
  const navigate = useNavigate();

  const handleNavClick = (page) => {
    const path = page === 'editor' ? '/editor' : `/${page}`;
    navigate(path);
  };

  return (
    <div className="novel-editor-container">
      {/* 左侧导航栏 */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="sidebar-toggle">≡</button>
        </div>
        <nav className="sidebar-nav">
          <div 
            className={`nav-item ${currentPage === 'editor' ? 'active' : ''}`}
            onClick={() => handleNavClick('editor')}
          >
            <span className="nav-icon">📄</span>
            <span className="nav-text">page1</span>
          </div>
          <div 
            className={`nav-item ${currentPage === 'characters' ? 'active' : ''}`}
            onClick={() => handleNavClick('characters')}
          >
            <span className="nav-icon">👤</span>
            <span className="nav-text">subpage1</span>
          </div>
          <div 
            className={`nav-item ${currentPage === 'navigation' ? 'active' : ''}`}
            onClick={() => handleNavClick('navigation')}
          >
            <span className="nav-icon">🔍</span>
            <span className="nav-text">page2</span>
          </div>
          <div 
            className={`nav-item ${currentPage === 'details' ? 'active' : ''}`}
            onClick={() => handleNavClick('details')}
          >
            <span className="nav-icon">📝</span>
            <span className="nav-text">page3</span>
          </div>
          <div 
            className={`nav-item ${currentPage === 'help' ? 'active' : ''}`}
            onClick={() => handleNavClick('help')}
          >
            <span className="nav-icon">❓</span>
            <span className="nav-text">page4</span>
          </div>
          <div 
            className={`nav-item ${currentPage === 'innovation' ? 'active' : ''}`}
            onClick={() => handleNavClick('innovation')}
          >
            <span className="nav-icon">💡</span>
            <span className="nav-text">page5</span>
          </div>
        </nav>
      </div>

      {/* 主内容区 */}
      <div className="main-content">
        {/* 顶部工具栏 */}
        <header className="top-toolbar">
          <div className="toolbar-center">
            <div className="logo">📝 App</div>
          </div>
        </header>

        {/* 内容区域 */}
        <div className="content-area">
          {currentPage === 'characters' ? (
            <CharacterManager />
          ) : currentPage === 'navigation' ? (
            <NavigationPage />
          ) : currentPage === 'details' ? (
            <DetailsPage />
          ) : currentPage === 'help' ? (
            <HelpPage />
          ) : currentPage === 'innovation' ? (
            <InnovationPage />
          ) : (
            <>
              {/* 中间编辑区 */}
              <div className="edit-area">
                <div className="chapter-editor">
                  <div className="chapter-header">
                    <div 
                      className="chapter-number-display"
                      contentEditable
                      suppressContentEditableWarning={true}
                    >第01章</div>
                    <div 
                      className="chapter-title-display"
                      contentEditable
                      suppressContentEditableWarning={true}
                    >鹰击长空</div>
                  </div>
                  <div 
                    className="chapter-content-editor"
                    contentEditable
                    suppressContentEditableWarning={true}
                    placeholder="请输入章节内容..."
                  ></div>
                </div>
              </div>

              {/* 右侧面板 */}
              <div className="right-panel">
                <div className="panel-section outline-section">
                  <h3>小说大纲</h3>
                  <div className="panel-content outline-content">
                    <div className="outline-preview">
                      <p>小说大纲内容将在这里显示...</p>
                    </div>
                  </div>
                </div>

                <div className="panel-section ai-section">
                  <h3>AI剧情建议</h3>
                  <div className="panel-content ai-content">
                    <p>AI通过分析大纲给出的剧情建议，帮助您更好地发展故事...</p>
                    <button type="button" className="panel-button generate-button">生成剧情</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NovelEditor;