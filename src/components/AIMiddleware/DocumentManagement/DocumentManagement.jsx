import React, { useState } from 'react';
import './DocumentManagement.css';

const DocumentManagement = () => {
  // 文档管理demo数据 - 文件浏览器结构
  const [fileSystem, setFileSystem] = useState([
    {
      id: 'folder-001',
      name: '项目文档',
      type: 'folder',
      icon: '📁',
      size: '',
      modified: '2026-03-25',
      children: [
        {
          id: 'folder-002',
          name: '需求文档',
          type: 'folder',
          icon: '📋',
          size: '',
          modified: '2026-03-25',
          children: [
            {
              id: 'file-001',
              name: '产品需求文档.pdf',
              type: 'pdf',
              icon: '📄',
              size: '2.5 MB',
              modified: '2026-03-25'
            },
            {
              id: 'file-002',
              name: '技术需求规格.docx',
              type: 'docx',
              icon: '📄',
              size: '1.8 MB',
              modified: '2026-03-24'
            },
            {
              id: 'file-003',
              name: '用户故事映射.xlsx',
              type: 'xlsx',
              icon: '📊',
              size: '850 KB',
              modified: '2026-03-23'
            }
          ]
        },
        {
          id: 'folder-003',
          name: '技术文档',
          type: 'folder',
          icon: '💻',
          size: '',
          modified: '2026-03-24',
          children: [
            {
              id: 'file-004',
              name: '系统架构设计.pdf',
              type: 'pdf',
              icon: '📄',
              size: '3.2 MB',
              modified: '2026-03-24'
            },
            {
              id: 'file-005',
              name: 'API文档.md',
              type: 'md',
              icon: '📝',
              size: '120 KB',
              modified: '2026-03-23'
            },
            {
              id: 'file-006',
              name: '数据库设计.pptx',
              type: 'pptx',
              icon: '📊',
              size: '4.5 MB',
              modified: '2026-03-22'
            }
          ]
        },
        {
          id: 'folder-004',
          name: '测试文档',
          type: 'folder',
          icon: '🧪',
          size: '',
          modified: '2026-03-23',
          children: [
            {
              id: 'file-007',
              name: '测试用例.xlsx',
              type: 'xlsx',
              icon: '📊',
              size: '650 KB',
              modified: '2026-03-23'
            },
            {
              id: 'file-008',
              name: '性能测试报告.pdf',
              type: 'pdf',
              icon: '📄',
              size: '1.2 MB',
              modified: '2026-03-22'
            }
          ]
        }
      ]
    },
    {
      id: 'folder-005',
      name: '会议纪要',
      type: 'folder',
      icon: '📝',
      size: '',
      modified: '2026-03-25',
      children: [
        {
          id: 'file-009',
          name: '项目启动会议.pdf',
          type: 'pdf',
          icon: '📄',
          size: '890 KB',
          modified: '2026-03-15'
        },
        {
          id: 'file-010',
          name: '每周进度会议.docx',
          type: 'docx',
          icon: '📄',
          size: '2.1 MB',
          modified: '2026-03-24'
        }
      ]
    },
    {
      id: 'folder-006',
      name: '用户反馈',
      type: 'folder',
      icon: '💬',
      size: '',
      modified: '2026-03-22',
      children: [
        {
          id: 'file-011',
          name: '用户调研报告.pdf',
          type: 'pdf',
          icon: '📄',
          size: '3.7 MB',
          modified: '2026-03-20'
        },
        {
          id: 'file-012',
          name: 'Bug报告.xlsx',
          type: 'xlsx',
          icon: '📊',
          size: '450 KB',
          modified: '2026-03-22'
        }
      ]
    },
    {
      id: 'file-013',
      name: '项目计划甘特图.pptx',
      type: 'pptx',
      icon: '📊',
      size: '5.2 MB',
      modified: '2026-03-10'
    },
    {
      id: 'file-014',
      name: '团队章程.md',
      type: 'md',
      icon: '📝',
      size: '95 KB',
      modified: '2026-03-01'
    }
  ]);

  const [expandedFolders, setExpandedFolders] = useState(['folder-001']);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(['根目录']);

  // 切换文件夹展开/折叠状态
  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => {
      if (prev.includes(folderId)) {
        return prev.filter(id => id !== folderId);
      } else {
        return [...prev, folderId];
      }
    });
  };

  // 处理文件/文件夹点击事件
  const handleItemClick = (item) => {
    if (item.type === 'folder') {
      toggleFolder(item.id);
    } else {
      setSelectedFile(item);
      setIsDetailOpen(true);
    }
  };

  // 关闭详情面板
  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedFile(null);
  };

  // 渲染文件系统树
  const renderFileSystem = (items, level = 0) => {
    return items.map(item => (
      <div key={item.id} className="file-item" style={{ paddingLeft: `${level * 20}px` }}>
        <div 
          className={`file-item-content ${item.type === 'folder' ? 'folder-item' : 'file-item'}`}
          onClick={() => handleItemClick(item)}
        >
          <span className="file-icon">
            {item.type === 'folder' ? (
              <span className="folder-toggle">
                {expandedFolders.includes(item.id) ? '▼' : '▶'}
              </span>
            ) : null}
            {item.icon}
          </span>
          <span className="file-name">{item.name}</span>
          <span className="file-size">{item.size}</span>
          <span className="file-modified">{item.modified}</span>
        </div>
        {item.type === 'folder' && expandedFolders.includes(item.id) && item.children && (
          <div className="folder-children">
            {renderFileSystem(item.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="document-management">
      <div className="document-header">
        <h2>文档管理</h2>
        <div className="document-info">
          <span>浏览当前项目所有累积文档</span>
        </div>
      </div>

      <div className="document-content">
        {/* 文件浏览器区域 */}
        <div className="file-explorer">
          {/* 路径导航 */}
          <div className="path-navigator">
            {currentPath.map((path, index) => (
              <span key={index} className="path-segment">
                {path}
                {index < currentPath.length - 1 && <span className="path-separator"> / </span>}
              </span>
            ))}
          </div>

          {/* 文件列表 */}
          <div className="file-list">
            <div className="file-list-header">
              <div className="header-name">名称</div>
              <div className="header-size">大小</div>
              <div className="header-modified">修改时间</div>
            </div>
            <div className="file-list-content">
              {renderFileSystem(fileSystem)}
            </div>
          </div>
        </div>

        {/* 文档详情面板 */}
        {isDetailOpen && selectedFile && (
          <div className="document-detail-panel">
            <div className="detail-header">
              <h3>文档详情</h3>
              <button className="close-btn" onClick={handleCloseDetail}>×</button>
            </div>
            
            <div className="detail-content">
              <div className="detail-section">
                <div className="document-icon-large">{selectedFile.icon}</div>
                <h4>{selectedFile.name}</h4>
                <div className="document-type">{selectedFile.type.toUpperCase()}</div>
              </div>
              
              <div className="detail-section">
                <h4>文件信息</h4>
                <div className="detail-grid">
                  <div className="detail-field">
                    <span className="field-label">文件名称:</span>
                    <span className="field-value">{selectedFile.name}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">文件类型:</span>
                    <span className="field-value">{selectedFile.type.toUpperCase()}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">文件大小:</span>
                    <span className="field-value">{selectedFile.size}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">修改时间:</span>
                    <span className="field-value">{selectedFile.modified}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">文件ID:</span>
                    <span className="field-value">{selectedFile.id}</span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h4>文档预览</h4>
                <div className="document-preview">
                  <div className="preview-placeholder">
                    <span className="preview-icon">{selectedFile.icon}</span>
                    <p>预览不可用</p>
                    <p>点击下方按钮打开文件</p>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h4>操作</h4>
                <div className="detail-actions">
                  <button className="action-btn open-btn">打开文件</button>
                  <button className="action-btn download-btn">下载文件</button>
                  <button className="action-btn share-btn">分享文件</button>
                  <button className="action-btn delete-btn">删除文件</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentManagement;