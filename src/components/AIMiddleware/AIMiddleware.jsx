import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AIMiddleware.css';
import UserManagement from '../UserManagement/UserManagement';
import RequirementsLayer from '../RequirementsLayer/RequirementsLayer';

function AIMiddleware({ page = 'requirements' }) {
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
            className={`nav-item ${currentPage === 'requirements' ? 'active' : ''}`}
            onClick={() => handleNavClick('requirements')}
          >
            <span className="nav-icon">📋</span>
            <span className="nav-text">需求拆解层</span>
          </div>
          <div 
            className={`nav-item ${currentPage === 'kanban' ? 'active' : ''}`}
            onClick={() => handleNavClick('kanban')}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">看板开发层</span>
          </div>
          <div 
            className={`nav-item ${currentPage === 'workflow' ? 'active' : ''}`}
            onClick={() => handleNavClick('workflow')}
          >
            <span className="nav-icon">🔄</span>
            <span className="nav-text">工作流编排层</span>
          </div>
          <div 
            className={`nav-item ${currentPage === 'agent' ? 'active' : ''}`}
            onClick={() => handleNavClick('agent')}
          >
            <span className="nav-icon">🤖</span>
            <span className="nav-text">agent层</span>
          </div>
          <div 
            className={`nav-item ${currentPage === 'agent-capabilities' ? 'active' : ''}`}
            onClick={() => handleNavClick('agent-capabilities')}
          >
            <span className="nav-icon">⚙️</span>
            <span className="nav-text">agent能力层</span>
          </div>
          <div 
            className={`nav-item ${currentPage === 'models' ? 'active' : ''}`}
            onClick={() => handleNavClick('models')}
          >
            <span className="nav-icon">🧠</span>
            <span className="nav-text">模型管理层</span>
          </div>
          <div 
            className={`nav-item ${currentPage === 'data' ? 'active' : ''}`}
            onClick={() => handleNavClick('data')}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">数据管理层</span>
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
          {currentPage === 'requirements' ? (
            <RequirementsLayer />
          ) : (
            <div className="page-content">
              <h1>{currentPage}</h1>
              <p>页面内容待开发...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AIMiddleware;