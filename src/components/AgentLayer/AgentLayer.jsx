import React, { useState } from 'react';
import './AgentLayer.css';

const AgentLayer = () => {
  // 与看板开发层保持一致的agent数据
  const [agents, setAgents] = useState([
    // 开发agent分类
    {
      id: 'dev-agent',
      category: '开发agent',
      icon: '💻',
      description: '负责系统开发任务的智能代理',
      members: [
        {
          id: 'agent-1',
          name: '开发agent - 后端',
          avatar: '🔐',
          description: '专注于后端服务开发，包括API设计、数据库管理和系统架构',
          skills: ['Node.js', 'Express', 'MySQL', 'Redis', 'RESTful API'],
          tasks: ['用户认证系统', 'API接口开发', '数据导入导出']
        },
        {
          id: 'agent-2',
          name: '开发agent - 前端',
          avatar: '📊',
          description: '负责前端界面开发，包括UI设计、交互实现和性能优化',
          skills: ['React', 'TypeScript', 'Ant Design', 'Redux', 'ECharts'],
          tasks: ['数据可视化模块', '用户反馈系统', '报表系统']
        },
        {
          id: 'agent-11',
          name: '开发agent - 文档',
          avatar: '📄',
          description: '专注于系统文档编写，包括技术文档、用户手册和部署指南',
          skills: ['Markdown', '文档架构', '技术写作'],
          tasks: ['系统部署文档']
        }
      ]
    },
    // 测试agent分类
    {
      id: 'test-agent',
      category: '测试agent',
      icon: '🧪',
      description: '负责系统测试任务的智能代理',
      members: [
        {
          id: 'agent-3',
          name: '测试agent - 接口',
          avatar: '🧪',
          description: '专注于API接口测试，包括功能测试、性能测试和安全性测试',
          skills: ['API测试', 'Postman', 'JMeter', '接口自动化'],
          tasks: ['API接口开发']
        },
        {
          id: 'agent-10',
          name: '测试agent - UI',
          avatar: '🎨',
          description: '负责前端界面测试，包括功能测试、兼容性测试和用户体验测试',
          skills: ['UI测试', 'Selenium', 'Cypress', '界面自动化'],
          tasks: ['前端界面开发']
        }
      ]
    },
    // 需求拆解agent分类 - 独立分类
    {
      id: 'req-agent',
      category: '需求拆解agent',
      icon: '📝',
      description: '负责需求分析和任务拆解的智能代理',
      members: [
        {
          id: 'agent-12',
          name: '需求拆解agent',
          avatar: '📝',
          description: '负责将原始需求拆解为可执行的任务和故事卡',
          skills: ['需求分析', '任务拆解', '用户故事', '敏捷开发'],
          tasks: ['需求拆解', '任务规划', '故事卡生成']
        }
      ]
    },
    // 代码集成(CICD)agent分类 - 独立分类
    {
      id: 'cicd-agent',
      category: '代码集成agent',
      icon: '🔄',
      description: '负责代码构建、测试和部署自动化的智能代理',
      members: [
        {
          id: 'agent-13',
          name: '代码集成(CICD)agent',
          avatar: '🔄',
          description: '负责代码构建、测试和部署的自动化流程管理',
          skills: ['Git', 'Jenkins', 'Docker', 'Kubernetes', 'CI/CD'],
          tasks: ['代码构建', '自动化测试', '部署发布']
        }
      ]
    }
  ]);

  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 处理agent点击事件
  const handleAgentClick = (agent) => {
    setSelectedAgent(agent);
    setIsDetailOpen(true);
  };

  // 关闭详情面板
  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedAgent(null);
  };

  return (
    <div className="agent-layer">
      <div className="agent-header">
        <h2>Agent管理</h2>
        <div className="agent-info">
          <span>总共有 {agents.reduce((sum, cat) => sum + cat.members.length, 0)} 个可用Agent</span>
        </div>
      </div>

      <div className="agent-content">
        {/* Agent分类列表 */}
        <div className="agent-categories">
          {agents.map(category => (
            <div key={category.id} className="agent-category">
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h3>{category.category}</h3>
                <span className="category-count">({category.members.length})</span>
              </div>
              <p className="category-description">{category.description}</p>
              
              {/* Agent列表 */}
              <div className="agent-list">
                {category.members.map(agent => (
                  <div 
                    key={agent.id} 
                    className="agent-card"
                    onClick={() => handleAgentClick(agent)}
                  >
                    <div className="agent-card-header">
                      <span className="agent-avatar">{agent.avatar}</span>
                      <div className="agent-card-info">
                        <h4>{agent.name}</h4>
                        <p className="agent-card-description">{agent.description}</p>
                      </div>
                    </div>
                    <div className="agent-skills">
                      {agent.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                      {agent.skills.length > 3 && (
                        <span className="skill-more">+{agent.skills.length - 3}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Agent详情面板 */}
        {isDetailOpen && selectedAgent && (
          <div className="agent-detail-panel">
            <div className="detail-header">
              <h3>{selectedAgent.name} 详情</h3>
              <button className="close-btn" onClick={handleCloseDetail}>×</button>
            </div>
            
            <div className="detail-content">
              <div className="detail-avatar">{selectedAgent.avatar}</div>
              <div className="detail-section">
                <h4>基本信息</h4>
                <p>{selectedAgent.description}</p>
              </div>
              
              <div className="detail-section">
                <h4>技能专长</h4>
                <div className="detail-skills">
                  {selectedAgent.skills.map((skill, index) => (
                    <span key={index} className="detail-skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>操作</h4>
                <div className="detail-actions">
                  <button className="action-btn edit-btn">编辑Agent</button>
                  <button className="action-btn config-btn">配置技能</button>
                  <button className="action-btn delete-btn">删除Agent</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentLayer;