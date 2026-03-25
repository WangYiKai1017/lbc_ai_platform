import React, { useState } from 'react';
import './DataManagement.css';

const DataManagement = () => {
  // 数据管理层demo数据 - 三类数据库
  const [databases, setDatabases] = useState([
    {
      id: 'db-001',
      name: 'PostgreSQL',
      type: 'pgsql',
      icon: '🗄️',
      description: '中台和后端连接的中间数据库，存储核心业务数据',
      host: 'pgsql.middleware.internal',
      port: 5432,
      status: 'active',
      version: '15.4',
      size: '128 GB',
      tables: 45,
      connections: 234,
      uptime: '32 days, 14 hours',
      lastBackup: '2026-03-25 02:00:00',
      purpose: '核心业务数据存储',
      features: ['事务支持', 'SQL兼容', 'JSONB支持', '全文搜索']
    },
    {
      id: 'db-002',
      name: 'Elasticsearch',
      type: 'elasticsearch',
      icon: '🔍',
      description: '存储对话历史信息的KV数据库，支持全文搜索和实时分析',
      host: 'elasticsearch.middleware.internal',
      port: 9200,
      status: 'active',
      version: '8.12.0',
      size: '512 GB',
      indices: 28,
      documents: '12.8M',
      connections: 156,
      uptime: '45 days, 8 hours',
      lastBackup: '2026-03-24 22:00:00',
      purpose: '对话历史存储与搜索',
      features: ['全文搜索', '实时分析', '分布式架构', 'REST API']
    },
    {
      id: 'db-003',
      name: 'RocksDB',
      type: 'rocksdb',
      icon: '⚡',
      description: '存储所有agent执行状态checkpoints的高性能键值数据库',
      host: 'rocksdb.middleware.internal',
      port: 8080,
      status: 'active',
      version: '8.10.0',
      size: '256 GB',
      keyCount: '8.5M',
      connections: 89,
      uptime: '56 days, 2 hours',
      lastBackup: '2026-03-23 00:00:00',
      purpose: 'Agent状态存储',
      features: ['高性能', '持久化', '低延迟', '事务支持']
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
    <div className="data-management">
      <div className="data-header">
        <h2>数据管理层</h2>
        <div className="data-info">
          <span>总共有 {databases.length} 个数据库实例</span>
          <span className="status-badge active">活跃: {databases.filter(db => db.status === 'active').length}</span>
        </div>
      </div>

      <div className="data-content">
        {/* 数据库列表 */}
        <div className="data-databases">
          {databases.map(database => (
            <div 
              key={database.id} 
              className={`data-database-card ${database.status}`}
              onClick={() => handleDatabaseClick(database)}
            >
              <div className="data-card-header">
                <span className="data-icon">{database.icon}</span>
                <div className="data-card-info">
                  <h3>{database.name}</h3>
                  <div className="data-type">{database.type}</div>
                </div>
                <div className={`status-indicator ${database.status}`}>
                  {database.status === 'active' ? '活跃' : '维护中'}
                </div>
              </div>
              
              <p className="data-description">{database.description}</p>
              
              <div className="data-stats">
                <div className="stat-item">
                  <span className="stat-label">大小:</span>
                  <span className="stat-value">{database.size}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">地址:</span>
                  <span className="stat-value truncate">{database.host}:{database.port}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">连接数:</span>
                  <span className="stat-value">{database.connections}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">运行时间:</span>
                  <span className="stat-value truncate">{database.uptime}</span>
                </div>
              </div>
              
              <div className="data-updated">
                最后备份: {database.lastBackup}
              </div>
            </div>
          ))}
        </div>

        {/* 数据库详情面板 */}
        {isDetailOpen && selectedDatabase && (
          <div className="data-detail-panel">
            <div className="detail-header">
              <h3>{selectedDatabase.name} 详情</h3>
              <button className="close-btn" onClick={handleCloseDetail}>×</button>
            </div>
            
            <div className="detail-content">
              <div className="detail-section">
                <div className="data-icon-large">{selectedDatabase.icon}</div>
                <h4>{selectedDatabase.name}</h4>
                <div className="data-type-large">{selectedDatabase.type}</div>
                <div className={`status-badge-large ${selectedDatabase.status}`}>
                  {selectedDatabase.status === 'active' ? '活跃' : '维护中'}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>描述</h4>
                <p className="data-full-description">{selectedDatabase.description}</p>
              </div>
              
              <div className="detail-section">
                <h4>数据库信息</h4>
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
                    <span className="field-label">主机:</span>
                    <span className="field-value">{selectedDatabase.host}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">端口:</span>
                    <span className="field-value">{selectedDatabase.port}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">版本:</span>
                    <span className="field-value">{selectedDatabase.version}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">大小:</span>
                    <span className="field-value">{selectedDatabase.size}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">连接数:</span>
                    <span className="field-value">{selectedDatabase.connections}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">运行时间:</span>
                    <span className="field-value">{selectedDatabase.uptime}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">最后备份:</span>
                    <span className="field-value">{selectedDatabase.lastBackup}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">用途:</span>
                    <span className="field-value">{selectedDatabase.purpose}</span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h4>数据库统计</h4>
                <div className="database-stats">
                  {selectedDatabase.type === 'pgsql' && (
                    <div className="stat-row">
                      <span className="stat-name">表数量:</span>
                      <span className="stat-value">{selectedDatabase.tables}</span>
                    </div>
                  )}
                  {selectedDatabase.type === 'elasticsearch' && (
                    <>
                      <div className="stat-row">
                        <span className="stat-name">索引数:</span>
                        <span className="stat-value">{selectedDatabase.indices}</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-name">文档数:</span>
                        <span className="stat-value">{selectedDatabase.documents}</span>
                      </div>
                    </>
                  )}
                  {selectedDatabase.type === 'rocksdb' && (
                    <div className="stat-row">
                      <span className="stat-name">键数量:</span>
                      <span className="stat-value">{selectedDatabase.keyCount}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>特性</h4>
                <div className="detail-features">
                  {selectedDatabase.features.map((feature, index) => (
                    <span key={index} className="detail-feature">{feature}</span>
                  ))}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>操作</h4>
                <div className="detail-actions">
                  <button className="action-btn query-btn">查询数据库</button>
                  <button className="action-btn backup-btn">创建备份</button>
                  <button className="action-btn config-btn">配置数据库</button>
                  <button className="action-btn monitor-btn">监控状态</button>
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

export default DataManagement;