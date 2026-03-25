import React, { useState } from 'react';
import './RAGManagement.css';

const RAGManagement = () => {
  // RAG数据库demo数据
  const [ragDatabases, setRagDatabases] = useState([
    {
      id: 'rag-001',
      name: '产品文档知识库',
      type: '文档型',
      icon: '📚',
      description: '包含所有产品文档、用户手册和API文档的知识库',
      size: '2.5 GB',
      documents: 1245,
      vectors: '8.3M',
      status: 'active',
      created: '2026-01-15',
      lastUpdated: '2026-03-25',
      tags: ['产品', '文档', 'API']
    },
    {
      id: 'rag-002',
      name: '代码库索引',
      type: '代码型',
      icon: '💻',
      description: '项目源代码的向量索引，支持代码搜索和理解',
      size: '4.8 GB',
      documents: 8923,
      vectors: '24.7M',
      status: 'active',
      created: '2026-02-03',
      lastUpdated: '2026-03-24',
      tags: ['代码', '开发', '索引']
    },
    {
      id: 'rag-003',
      name: '客户反馈数据库',
      type: '文本型',
      icon: '💬',
      description: '所有客户反馈、支持请求和投诉的文本数据库',
      size: '1.2 GB',
      documents: 5678,
      vectors: '15.2M',
      status: 'active',
      created: '2026-01-28',
      lastUpdated: '2026-03-25',
      tags: ['客户', '反馈', '支持']
    },
    {
      id: 'rag-004',
      name: '研究报告库',
      type: '文档型',
      icon: '🔬',
      description: '行业研究报告、白皮书和技术文档的知识库',
      size: '3.7 GB',
      documents: 432,
      vectors: '2.9M',
      status: 'active',
      created: '2026-02-18',
      lastUpdated: '2026-03-22',
      tags: ['研究', '报告', '行业']
    },
    {
      id: 'rag-005',
      name: '历史项目数据',
      type: '混合型',
      icon: '📊',
      description: '包含历史项目数据、指标和分析报告的数据库',
      size: '6.3 GB',
      documents: 12345,
      vectors: '31.8M',
      status: 'maintenance',
      created: '2026-01-10',
      lastUpdated: '2026-03-20',
      tags: ['项目', '数据', '分析']
    }
  ]);

  const [selectedDatabase, setSelectedDatabase] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 处理数据库点击事件
  const handleDatabaseClick = (database) => {
    setSelectedDatabase(database);
    setIsDetailOpen(true);
  };

  // 关闭详情面板
  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedDatabase(null);
  };

  return (
    <div className="rag-management">
      <div className="rag-header">
        <h2>RAG数据库管理</h2>
        <div className="rag-info">
          <span>总共有 {ragDatabases.length} 个RAG数据库</span>
          <span className="status-badge active">活跃: {ragDatabases.filter(db => db.status === 'active').length}</span>
          <span className="status-badge maintenance">维护中: {ragDatabases.filter(db => db.status === 'maintenance').length}</span>
        </div>
      </div>

      <div className="rag-content">
        {/* RAG数据库列表 */}
        <div className="rag-databases">
          {ragDatabases.map(database => (
            <div 
              key={database.id} 
              className={`rag-database-card ${database.status}`}
              onClick={() => handleDatabaseClick(database)}
            >
              <div className="rag-card-header">
                <span className="rag-icon">{database.icon}</span>
                <div className="rag-card-info">
                  <h3>{database.name}</h3>
                  <div className="rag-type">{database.type}</div>
                </div>
                <div className={`status-indicator ${database.status}`}>
                  {database.status === 'active' ? '活跃' : '维护中'}
                </div>
              </div>
              
              <p className="rag-description">{database.description}</p>
              
              <div className="rag-stats">
                <div className="stat-item">
                  <span className="stat-label">大小:</span>
                  <span className="stat-value">{database.size}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">文档数:</span>
                  <span className="stat-value">{database.documents.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">向量数:</span>
                  <span className="stat-value">{database.vectors}</span>
                </div>
              </div>
              
              <div className="rag-updated">
                最后更新: {database.lastUpdated}
              </div>
            </div>
          ))}
        </div>

        {/* RAG数据库详情面板 */}
        {isDetailOpen && selectedDatabase && (
          <div className="rag-detail-panel">
            <div className="detail-header">
              <h3>{selectedDatabase.name} 详情</h3>
              <button className="close-btn" onClick={handleCloseDetail}>×</button>
            </div>
            
            <div className="detail-content">
              <div className="detail-section">
                <div className="rag-icon-large">{selectedDatabase.icon}</div>
                <h4>{selectedDatabase.name}</h4>
                <div className="rag-type-large">{selectedDatabase.type}</div>
                <div className={`status-badge-large ${selectedDatabase.status}`}>
                  {selectedDatabase.status === 'active' ? '活跃' : '维护中'}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>描述</h4>
                <p className="rag-full-description">{selectedDatabase.description}</p>
              </div>
              
              <div className="detail-section">
                <h4>数据库统计</h4>
                <div className="detail-grid">
                  <div className="detail-field">
                    <span className="field-label">数据库ID:</span>
                    <span className="field-value">{selectedDatabase.id}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">类型:</span>
                    <span className="field-value">{selectedDatabase.type}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">大小:</span>
                    <span className="field-value">{selectedDatabase.size}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">文档数量:</span>
                    <span className="field-value">{selectedDatabase.documents.toLocaleString()}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">向量数量:</span>
                    <span className="field-value">{selectedDatabase.vectors}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">创建时间:</span>
                    <span className="field-value">{selectedDatabase.created}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">最后更新:</span>
                    <span className="field-value">{selectedDatabase.lastUpdated}</span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h4>标签</h4>
                <div className="detail-tags">
                  {selectedDatabase.tags.map((tag, index) => (
                    <span key={index} className="detail-tag">{tag}</span>
                  ))}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>操作</h4>
                <div className="detail-actions">
                  <button className="action-btn query-btn">查询数据库</button>
                  <button className="action-btn sync-btn">同步数据</button>
                  <button className="action-btn config-btn">配置数据库</button>
                  <button className="action-btn delete-btn">删除数据库</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RAGManagement;