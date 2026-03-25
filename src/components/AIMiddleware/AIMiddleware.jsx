import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AIMiddleware.css';
import UserManagement from '../UserManagement/UserManagement';
import RequirementsLayer from '../RequirementsLayer/RequirementsLayer';
import KanbanLayer from '../KanbanLayer/KanbanLayer';
import WorkflowLayer from '../WorkflowLayer/WorkflowLayer';
import AgentLayer from '../AgentLayer/AgentLayer';
import MCPManagement from './MCPManagement/MCPManagement';
import SkillManagement from './SkillManagement/SkillManagement';
import RAGManagement from './RAGManagement/RAGManagement';
import ModelManagement from './ModelManagement/ModelManagement';
import DataManagement from './DataManagement/DataManagement';
import DocumentManagement from './DocumentManagement/DocumentManagement';
import SliceTool from './SliceTool/SliceTool';

function AIMiddleware({ page = 'requirements' }) {
  const currentPage = page;
  const navigate = useNavigate();
  const [expandedMenu, setExpandedMenu] = useState(null);

  const handleNavClick = (page) => {
    const path = page === 'editor' ? '/editor' : `/${page}`;
    navigate(path);
  };

  const toggleSubMenu = (menuName) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  const isSubMenuActive = (parent, child) => {
    return currentPage === child;
  };

  return (
    <div className="novel-editor-container">
      {/* 左侧导航栏 */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>工具栏</h2>
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
          
          {/* agent能力层 - 带子菜单 */}
          <div 
            className={`nav-item ${currentPage.includes('agent-capabilities') ? 'active' : ''}`}
            onClick={() => toggleSubMenu('agent-capabilities')}
          >
            <span className="nav-icon">⚙️</span>
            <span className="nav-text">agent能力层</span>
            <span className={`submenu-toggle ${expandedMenu === 'agent-capabilities' ? 'expanded' : ''}`}>
              {expandedMenu === 'agent-capabilities' ? '▼' : '▶'}
            </span>
          </div>
          
          {/* agent能力层子菜单 */}
          <div className={`submenu ${expandedMenu === 'agent-capabilities' ? 'expanded' : ''}`}>
            <div 
              className={`submenu-item ${isSubMenuActive('agent-capabilities', 'mcp-management') ? 'active' : ''}`}
              onClick={() => handleNavClick('mcp-management')}
            >
              <span className="submenu-icon">🔧</span>
              <span className="submenu-text">MCP管理</span>
            </div>
            <div 
              className={`submenu-item ${isSubMenuActive('agent-capabilities', 'skill-management') ? 'active' : ''}`}
              onClick={() => handleNavClick('skill-management')}
            >
              <span className="submenu-icon">🧩</span>
              <span className="submenu-text">Skills管理</span>
            </div>
            <div 
              className={`submenu-item ${isSubMenuActive('agent-capabilities', 'rag-management') ? 'active' : ''}`}
              onClick={() => handleNavClick('rag-management')}
            >
              <span className="submenu-icon">📚</span>
              <span className="submenu-text">RAG管理</span>
            </div>
            <div 
              className={`submenu-item ${isSubMenuActive('agent-capabilities', 'slice-tool') ? 'active' : ''}`}
              onClick={() => handleNavClick('slice-tool')}
            >
              <span className="submenu-icon">✂️</span>
              <span className="submenu-text">切片工具</span>
            </div>
          </div>
          
          <div 
            className={`nav-item ${currentPage === 'documents' ? 'active' : ''}`}
            onClick={() => handleNavClick('documents')}
          >
            <span className="nav-icon">📁</span>
            <span className="nav-text">文档管理</span>
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
            <div className="logo">🧠 LMBTCOS-AI中台</div>
          </div>
        </header>

        {/* 内容区域 */}
        <div className="content-area">
          {currentPage === 'requirements' ? (
            <RequirementsLayer />
          ) : currentPage === 'kanban' ? (
            <KanbanLayer />
          ) : currentPage === 'workflow' ? (
            <WorkflowLayer />
          ) : currentPage === 'agent' ? (
            <AgentLayer />
          ) : currentPage === 'mcp-management' ? (
            <MCPManagement />
          ) : currentPage === 'skill-management' ? (
            <SkillManagement />
          ) : currentPage === 'rag-management' ? (
            <RAGManagement />
          ) : currentPage === 'slice-tool' ? (
            <SliceTool />
          ) : currentPage === 'documents' ? (
            <DocumentManagement />
          ) : currentPage === 'models' ? (
            <ModelManagement />
          ) : currentPage === 'data' ? (
            <DataManagement />
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