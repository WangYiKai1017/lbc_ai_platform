import React, { useState } from 'react';
import './ModelManagement.css';

const ModelManagement = () => {
  // 模型管理demo数据 - 基于2026年主流大模型API和路由器信息
  const [modelRouters, setModelRouters] = useState([
    {
      id: 'router-001',
      name: 'OpenRouter',
      type: '国际聚合路由器',
      icon: '🌐',
      description: '全球模型覆盖最全面的聚合平台，支持100+主流大模型',
      baseUrl: 'https://openrouter.ai/api/v1',
      status: 'active',
      models: [
        { id: 'model-001', name: 'openrouter/free', type: '智能路由', description: '自动从可用免费模型中选择', provider: 'OpenRouter', context: '1M', price: '免费' },
        { id: 'model-002', name: 'gemini-2.0-flash-exp:free', type: '多模态', description: 'Google Gemini系列轻量版', provider: 'Google', context: '1M', price: '免费' },
        { id: 'model-003', name: 'meta-llama/llama-3.3-70b-instruct:free', type: '对话', description: 'Meta Llama 3.3系列', provider: 'Meta', context: '200K', price: '免费' },
        { id: 'model-004', name: 'deepseek/deepseek-r1-0528:free', type: '推理', description: 'DeepSeek R1系列推理模型', provider: 'DeepSeek', context: '32K', price: '免费' }
      ],
      rateLimit: '50次/天 (免费)',
      created: '2026-01-10',
      lastUpdated: '2026-03-25'
    },
    {
      id: 'router-002',
      name: 'GateRouter',
      type: '国际聚合路由器',
      icon: '⚡',
      description: '统一API 30秒接入主流AI大模型，推理成本可降80%',
      baseUrl: 'https://api.gaterouter.ai/v1',
      status: 'active',
      models: [
        { id: 'model-005', name: 'gpt-5-nano', type: '对话', description: 'OpenAI GPT-5系列轻量版', provider: 'OpenAI', context: '128K', price: '$0.40/M' },
        { id: 'model-006', name: 'gpt-5.4-pro', type: '高级对话', description: 'OpenAI GPT-5系列旗舰版', provider: 'OpenAI', context: '1M', price: '$180/M' },
        { id: 'model-007', name: 'claude-3-opus', type: '长文本', description: 'Anthropic Claude 3系列旗舰版', provider: 'Anthropic', context: '200K', price: '$15/M' }
      ],
      rateLimit: '无限制 (按量付费)',
      created: '2026-03-13',
      lastUpdated: '2026-03-25'
    },
    {
      id: 'router-003',
      name: '星链引擎4SAPICOM',
      type: '国内企业级路由器',
      icon: '🛰️',
      description: '全栈方案、技术成熟、全球覆盖，适合企业级应用',
      baseUrl: 'https://api.4sapi.com/v1',
      status: 'active',
      models: [
        { id: 'model-008', name: 'qwen-3.5-72b', type: '多模态', description: '阿里云通义千问3.5系列', provider: '阿里云', context: '128K', price: '$0.05/M' },
        { id: 'model-009', name: 'glm-4.7-coder', type: '代码', description: '智谱AI GLM-4.7系列代码模型', provider: '智谱AI', context: '64K', price: '$0.08/M' },
        { id: 'model-010', name: 'kimi-k2.5', type: '长文本', description: 'Moonshot Kimi长文本模型', provider: 'Moonshot', context: '262K', price: '$0.10/M' }
      ],
      rateLimit: '根据套餐而定',
      created: '2026-01-05',
      lastUpdated: '2026-03-24'
    },
    {
      id: 'router-004',
      name: '硅基流动(SiliconFlow)',
      type: '国内高性能路由器',
      icon: '💎',
      description: '高并发、低延迟、国产模型友好，性能领先',
      baseUrl: 'https://api.siliconflow.cn/v1',
      status: 'active',
      models: [
        { id: 'model-011', name: 'deepseek-v3', type: '多模态', description: '深度求索DeepSeek V3系列', provider: 'DeepSeek', context: '32K', price: '$0.06/M' },
        { id: 'model-012', name: 'qwen2.5-72b', type: '对话', description: '阿里云通义千问2.5系列', provider: '阿里云', context: '128K', price: '$0.04/M' }
      ],
      rateLimit: 'QPS 5, TPM 100K',
      created: '2026-02-18',
      lastUpdated: '2026-03-22'
    },
    {
      id: 'router-005',
      name: '灵芽API',
      type: '国内开发者路由器',
      icon: '🌱',
      description: '国内便捷、支付友好、无需科学上网',
      baseUrl: 'https://api.lingya.ai/v1',
      status: 'active',
      models: [
        { id: 'model-013', name: 'ernie-4.5-lite', type: '对话', description: '百度文心一言4.5轻量版', provider: '百度', context: '128K', price: '免费 (限速)' },
        { id: 'model-014', name: 'doubao-seed', type: '多模态', description: '火山引擎豆包Seed系列', provider: '火山引擎', context: '64K', price: '免费 (每日200万tokens)' }
      ],
      rateLimit: 'QPS 2 (免费)',
      created: '2026-02-01',
      lastUpdated: '2026-03-23'
    }
  ]);

  const [selectedRouter, setSelectedRouter] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 处理路由器点击事件
  const handleRouterClick = (router) => {
    setSelectedRouter(router);
    setIsDetailOpen(true);
  };

  // 关闭详情面板
  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedRouter(null);
  };

  return (
    <div className="model-management">
      <div className="model-header">
        <h2>模型管理层</h2>
        <div className="model-info">
          <span>总共有 {modelRouters.length} 个模型路由器</span>
          <span className="status-badge active">活跃: {modelRouters.filter(router => router.status === 'active').length}</span>
        </div>
      </div>

      <div className="model-content">
        {/* 模型路由器列表 */}
        <div className="model-routers">
          {modelRouters.map(router => (
            <div 
              key={router.id} 
              className={`model-router-card ${router.status}`}
              onClick={() => handleRouterClick(router)}
            >
              <div className="model-card-header">
                <span className="model-icon">{router.icon}</span>
                <div className="model-card-info">
                  <h3>{router.name}</h3>
                  <div className="model-type">{router.type}</div>
                </div>
                <div className={`status-indicator ${router.status}`}>
                  {router.status === 'active' ? '活跃' : '维护中'}
                </div>
              </div>
              
              <p className="model-description">{router.description}</p>
              
              <div className="model-stats">
                <div className="stat-item">
                  <span className="stat-label">模型数:</span>
                  <span className="stat-value">{router.models.length}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">基础URL:</span>
                  <span className="stat-value truncate">{router.baseUrl}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">速率限制:</span>
                  <span className="stat-value">{router.rateLimit}</span>
                </div>
              </div>
              
              <div className="model-updated">
                最后更新: {router.lastUpdated}
              </div>
            </div>
          ))}
        </div>

        {/* 模型路由器详情面板 */}
        {isDetailOpen && selectedRouter && (
          <div className="model-detail-panel">
            <div className="detail-header">
              <h3>{selectedRouter.name} 详情</h3>
              <button className="close-btn" onClick={handleCloseDetail}>×</button>
            </div>
            
            <div className="detail-content">
              <div className="detail-section">
                <div className="model-icon-large">{selectedRouter.icon}</div>
                <h4>{selectedRouter.name}</h4>
                <div className="model-type-large">{selectedRouter.type}</div>
                <div className={`status-badge-large ${selectedRouter.status}`}>
                  {selectedRouter.status === 'active' ? '活跃' : '维护中'}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>描述</h4>
                <p className="model-full-description">{selectedRouter.description}</p>
              </div>
              
              <div className="detail-section">
                <h4>路由器信息</h4>
                <div className="detail-grid">
                  <div className="detail-field">
                    <span className="field-label">路由器ID:</span>
                    <span className="field-value">{selectedRouter.id}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">类型:</span>
                    <span className="field-value">{selectedRouter.type}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">基础URL:</span>
                    <span className="field-value truncate">{selectedRouter.baseUrl}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">速率限制:</span>
                    <span className="field-value">{selectedRouter.rateLimit}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">创建时间:</span>
                    <span className="field-value">{selectedRouter.created}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">最后更新:</span>
                    <span className="field-value">{selectedRouter.lastUpdated}</span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h4>可用模型</h4>
                <div className="model-list">
                  {selectedRouter.models.map(model => (
                    <div key={model.id} className="model-item">
                      <div className="model-item-header">
                        <h5>{model.name}</h5>
                        <span className="model-item-type">{model.type}</span>
                      </div>
                      <p className="model-item-description">{model.description}</p>
                      <div className="model-item-meta">
                        <span className="meta-item">
                          <strong>提供商:</strong> {model.provider}
                        </span>
                        <span className="meta-item">
                          <strong>上下文:</strong> {model.context}
                        </span>
                        <span className="meta-item">
                          <strong>价格:</strong> {model.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>操作</h4>
                <div className="detail-actions">
                  <button className="action-btn test-btn">测试连接</button>
                  <button className="action-btn config-btn">配置路由器</button>
                  <button className="action-btn monitor-btn">监控用量</button>
                  <button className="action-btn delete-btn">删除路由器</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelManagement;