import React, { useState } from 'react';
import './MCPManagement.css';

const MCPManagement = () => {
  // MCP工具demo数据 - 基于腾讯云文章推荐的工具
  const [mcpTools, setMcpTools] = useState([
    {
      id: 'mcp-001',
      name: 'Playwright MCP',
      type: '浏览器自动化',
      icon: '🌐',
      provider: '微软',
      address: 'https://playwright-mcp.example.com',
      apiKey: 'pk_playwright_1234567890abcdef',
      status: 'online',
      version: '1.8.0',
      description: '由微软官方出品，利用Playwright实现浏览器自动化，通过读取网页的结构化访问树让LLM与网页交互，无需截图或计算机视觉模型。',
      usageCount: 12845,
      lastUsed: '2026-03-25 14:30:45',
      responseTime: '120ms',
      availability: '99.9%',
      useCases: ['自动化网页操作', '表单填写', '数据提取', '自动化测试'],
      tags: ['浏览器', '自动化', '测试', '网页代理']
    },
    {
      id: 'mcp-002',
      name: 'Browser MCP',
      type: '本地浏览器控制',
      icon: '🖥️',
      provider: 'BrowserMCP团队',
      address: 'http://localhost:3000/mcp',
      apiKey: 'pk_browser_abcdef1234567890',
      status: 'online',
      version: '2.2.1',
      description: '基于浏览器扩展将AI连接到用户本地浏览器，实现对现有浏览器会话的自动化控制。利用用户已登录的浏览器环境在本地执行操作。',
      usageCount: 8923,
      lastUsed: '2026-03-25 14:28:12',
      responseTime: '85ms',
      availability: '100%',
      useCases: ['端到端测试', '自动化操作', '数据采集', '表单填写'],
      tags: ['本地', '浏览器', '自动化', '安全']
    },
    {
      id: 'mcp-003',
      name: 'Magic MCP',
      type: 'UI组件生成',
      icon: '🎨',
      provider: '21st.dev',
      address: 'https://magic-mcp.21st.dev',
      apiKey: 'pk_magic_9876543210fedcba',
      status: 'online',
      version: '3.0.5',
      description: 'AI驱动的UI组件生成工具，开发者只需通过自然语言描述即可生成前端界面组件，提供实时预览和丰富的现代组件库。',
      usageCount: 6542,
      lastUsed: '2026-03-25 14:15:30',
      responseTime: '250ms',
      availability: '99.8%',
      useCases: ['UI组件生成', '界面原型', '前端开发', '快速迭代'],
      tags: ['前端', 'UI', '组件', '设计']
    },
    {
      id: 'mcp-004',
      name: 'GitHub MCP',
      type: '代码仓库管理',
      icon: '🐙',
      provider: 'GitHub',
      address: 'https://github-mcp.example.com',
      apiKey: 'ghp_GitHubMCP1234567890abcdef',
      status: 'online',
      version: '1.5.3',
      description: 'GitHub官方提供的MCP服务，与GitHub API深度集成。通过该服务器，AI工具可以无缝访问GitHub的仓库数据和操作接口。',
      usageCount: 10234,
      lastUsed: '2026-03-25 14:35:20',
      responseTime: '180ms',
      availability: '99.95%',
      useCases: ['仓库管理', '代码检索', '自动化PR', '版本控制'],
      tags: ['GitHub', '代码', '版本控制', 'API']
    },
    {
      id: 'mcp-005',
      name: 'Firecrawl MCP',
      type: '网页爬取',
      icon: '🕷️',
      provider: 'Mendable AI',
      address: 'https://firecrawl-mcp.example.com',
      apiKey: 'fc_mcp_1a2b3c4d5e6f7g8h9i0j',
      status: 'online',
      version: '4.1.2',
      description: '集成了Firecrawl服务，提供全面的网页爬取与抓取功能。支持对JavaScript渲染网页的内容提取、自动发现链接进行深度爬取。',
      usageCount: 7891,
      lastUsed: '2026-03-25 14:40:15',
      responseTime: '320ms',
      availability: '99.7%',
      useCases: ['网页爬取', '数据收集', '信息检索', '内容分析'],
      tags: ['爬虫', '数据收集', '网页分析', '搜索']
    }
  ]);

  const [selectedTool, setSelectedTool] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 处理工具点击事件
  const handleToolClick = (tool) => {
    setSelectedTool(tool);
    setIsDetailOpen(true);
  };

  // 关闭详情面板
  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedTool(null);
  };

  return (
    <div className="mcp-management">
      <div className="mcp-header">
        <h2>MCP工具管理</h2>
        <div className="mcp-info">
          <span>总共有 {mcpTools.length} 个MCP工具</span>
          <span className="status-badge online">在线: {mcpTools.filter(t => t.status === 'online').length}</span>
          <span className="type-count">
            类型: {[...new Set(mcpTools.map(t => t.type))].length}
          </span>
        </div>
      </div>

      <div className="mcp-content">
        {/* MCP工具列表 */}
        <div className="mcp-tools">
          {mcpTools.map(tool => (
            <div 
              key={tool.id} 
              className={`mcp-tool-card ${tool.status}`}
              onClick={() => handleToolClick(tool)}
            >
              <div className="mcp-card-header">
                <div className="tool-icon">{tool.icon}</div>
                <div className="tool-info">
                  <h3>{tool.name}</h3>
                  <div className="tool-meta">
                    <span className="tool-provider">{tool.provider}</span>
                    <span className="tool-type">{tool.type}</span>
                  </div>
                </div>
                <div className={`status-indicator ${tool.status}`}>
                  {tool.status === 'online' ? '在线' : '离线'}
                </div>
              </div>
              
              <p className="tool-description">{tool.description}</p>
              
              <div className="mcp-card-details">
                <div className="detail-item">
                  <span className="detail-label">地址:</span>
                  <span className="detail-value truncate">{tool.address}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">版本:</span>
                  <span className="detail-value">{tool.version}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">响应时间:</span>
                  <span className="detail-value">{tool.responseTime}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">可用性:</span>
                  <span className="detail-value">{tool.availability}</span>
                </div>
              </div>
              
              <div className="mcp-card-tags">
                {tool.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="mcp-tag">{tag}</span>
                ))}
                {tool.tags.length > 3 && (
                  <span className="tag-more">+{tool.tags.length - 3}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* MCP工具详情面板 */}
        {isDetailOpen && selectedTool && (
          <div className="mcp-detail-panel">
            <div className="detail-header">
              <h3>{selectedTool.name} 详情</h3>
              <button className="close-btn" onClick={handleCloseDetail}>×</button>
            </div>
            
            <div className="detail-content">
              <div className="detail-section">
                <div className="tool-icon-large">{selectedTool.icon}</div>
                <h4>{selectedTool.name}</h4>
                <div className="tool-meta-large">
                  <span className="tool-provider-large">{selectedTool.provider}</span>
                  <span className="tool-type-large">{selectedTool.type}</span>
                </div>
                <div className={`status-badge-large ${selectedTool.status}`}>
                  {selectedTool.status === 'online' ? '在线' : '离线'}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>描述</h4>
                <p className="tool-description-large">{selectedTool.description}</p>
              </div>
              
              <div className="detail-section">
                <h4>连接信息</h4>
                <div className="connection-info">
                  <div className="detail-field">
                    <span className="field-label">工具ID:</span>
                    <span className="field-value">{selectedTool.id}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">访问地址:</span>
                    <span className="field-value">{selectedTool.address}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">API密钥:</span>
                    <span className="field-value api-key">{selectedTool.apiKey}</span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h4>技术信息</h4>
                <div className="detail-grid">
                  <div className="detail-field">
                    <span className="field-label">版本:</span>
                    <span className="field-value">{selectedTool.version}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">响应时间:</span>
                    <span className="field-value">{selectedTool.responseTime}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">可用性:</span>
                    <span className="field-value">{selectedTool.availability}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">使用次数:</span>
                    <span className="field-value">{selectedTool.usageCount.toLocaleString()}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">最后使用:</span>
                    <span className="field-value">{selectedTool.lastUsed}</span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h4>使用场景</h4>
                <div className="use-cases">
                  {selectedTool.useCases.map((useCase, index) => (
                    <div key={index} className="use-case-item">
                      <span className="use-case-icon">•</span>
                      <span className="use-case-text">{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>标签</h4>
                <div className="detail-tags">
                  {selectedTool.tags.map((tag, index) => (
                    <span key={index} className="detail-tag">{tag}</span>
                  ))}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>操作</h4>
                <div className="detail-actions">
                  <button className="action-btn test-btn">测试连接</button>
                  <button className="action-btn config-btn">配置工具</button>
                  <button className="action-btn regenerate-btn">重新生成密钥</button>
                  <button className="action-btn delete-btn">删除工具</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MCPManagement;