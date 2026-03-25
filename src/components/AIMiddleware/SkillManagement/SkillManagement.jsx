import React, { useState } from 'react';
import './SkillManagement.css';

const SkillManagement = () => {
  // Skills demo数据 - 基于demo.md文件的分类和内容
  const [skillCategories, setSkillCategories] = useState([
    {
      id: 'frontend',
      name: '前端开发 Skills',
      icon: '🎨',
      description: '前端开发相关的技能和工具',
      skills: [
        {
          id: 'code-reviewer',
          name: 'code-reviewer',
          description: '代码审查助手，自动检测前端代码问题、风格违规和潜在 bug',
          language: 'JavaScript, TypeScript',
          complexity: '中级',
          popularity: 92,
          usageCount: 15678,
          lastUpdated: '2026-03-20',
          tags: ['代码审查', '前端', '质量']
        },
        {
          id: 'typescript-fixer',
          name: 'typescript-fixer',
          description: '自动修复 TypeScript 类型错误，提供类型推断建议',
          language: 'TypeScript',
          complexity: '中级',
          popularity: 88,
          usageCount: 12345,
          lastUpdated: '2026-03-18',
          tags: ['TypeScript', '类型错误', '修复']
        },
        {
          id: 'svg-icon-creator',
          name: 'svg-icon-creator',
          description: '根据描述生成 SVG 图标，支持自定义颜色、尺寸',
          language: 'SVG, JavaScript',
          complexity: '初级',
          popularity: 85,
          usageCount: 9876,
          lastUpdated: '2026-03-15',
          tags: ['SVG', '图标', '生成']
        },
        {
          id: 'thumbnail-strategist',
          name: 'thumbnail-strategist',
          description: '生成网页缩略图策略，优化首屏加载体验',
          language: '多语言',
          complexity: '中级',
          popularity: 81,
          usageCount: 7654,
          lastUpdated: '2026-03-12',
          tags: ['性能优化', '缩略图', '首屏加载']
        },
        {
          id: 'browser-ladder',
          name: 'browser-ladder',
          description: '浏览器自动化测试，支持 Playwright/BrowserCat 分级方案',
          language: 'JavaScript',
          complexity: '高级',
          popularity: 89,
          usageCount: 11234,
          lastUpdated: '2026-03-22',
          tags: ['自动化测试', 'Playwright', '浏览器']
        },
        {
          id: 'browser-use-api',
          name: 'browser-use-api',
          description: 'AI 驱动的网页浏览、抓取、表单填写自动化',
          language: '多语言',
          complexity: '高级',
          popularity: 94,
          usageCount: 13456,
          lastUpdated: '2026-03-23',
          tags: ['AI', '网页自动化', '抓取']
        }
      ]
    },
    {
      id: 'backend',
      name: '后端开发 Skills',
      icon: '⚙️',
      description: '后端开发相关的技能和工具',
      skills: [
        {
          id: 'api-tester',
          name: 'api-tester',
          description: 'API 接口测试工具，支持 REST/GraphQL 自动化测试',
          language: '多语言',
          complexity: '中级',
          popularity: 90,
          usageCount: 14567,
          lastUpdated: '2026-03-19',
          tags: ['API测试', 'REST', 'GraphQL']
        },
        {
          id: 'refactoring-agent',
          name: 'refactoring-agent',
          description: '代码重构助手，识别代码异味并提供优化方案',
          language: '多语言',
          complexity: '高级',
          popularity: 87,
          usageCount: 10987,
          lastUpdated: '2026-03-16',
          tags: ['代码重构', '优化', '质量']
        },
        {
          id: 'bug-hunter',
          name: 'bug-hunter',
          description: '自动扫描代码库定位潜在 bug 和安全漏洞',
          language: '多语言',
          complexity: '高级',
          popularity: 93,
          usageCount: 16789,
          lastUpdated: '2026-03-21',
          tags: ['bug扫描', '安全', '漏洞']
        },
        {
          id: 'test-generator',
          name: 'test-generator',
          description: '根据源代码自动生成单元测试和集成测试',
          language: '多语言',
          complexity: '中级',
          popularity: 86,
          usageCount: 9876,
          lastUpdated: '2026-03-14',
          tags: ['测试生成', '单元测试', '集成测试']
        },
        {
          id: 'flyio-cli',
          name: 'flyio-cli',
          description: 'Fly.io 部署和管理 CLI，支持应用部署、日志查看、数据库管理',
          language: 'CLI',
          complexity: '中级',
          popularity: 78,
          usageCount: 5678,
          lastUpdated: '2026-03-10',
          tags: ['Fly.io', '部署', 'CLI']
        },
        {
          id: 'atlassian-mcp',
          name: 'atlassian-mcp',
          description: 'Jira/Confluence 集成，支持问题查询、文档管理',
          language: '多语言',
          complexity: '中级',
          popularity: 83,
          usageCount: 8765,
          lastUpdated: '2026-03-17',
          tags: ['Jira', 'Confluence', '集成']
        }
      ]
    },
    {
      id: 'documentation',
      name: '文档归纳 Skills',
      icon: '📄',
      description: '文档处理和归纳相关的技能和工具',
      skills: [
        {
          id: 'doc-assistant-pro',
          name: 'doc-assistant-pro',
          description: '专业文档助手，支持 PDF/Word/Markdown 解析和摘要',
          language: '多语言',
          complexity: '中级',
          popularity: 88,
          usageCount: 11234,
          lastUpdated: '2026-03-18',
          tags: ['文档', 'PDF', '解析']
        },
        {
          id: 'doc-writer',
          name: 'doc-writer',
          description: '自动编写技术文档、API 文档、README 等',
          language: '多语言',
          complexity: '中级',
          popularity: 91,
          usageCount: 13456,
          lastUpdated: '2026-03-20',
          tags: ['文档生成', '技术写作', 'API文档']
        },
        {
          id: 'pdf-chat',
          name: 'pdf-chat',
          description: '与 PDF 文档对话，支持问答、引用定位',
          language: '多语言',
          complexity: '高级',
          popularity: 95,
          usageCount: 17890,
          lastUpdated: '2026-03-23',
          tags: ['PDF', '对话', '问答']
        },
        {
          id: 'meeting-minute-taker',
          name: 'meeting-minute-taker',
          description: '会议纪要自动生成，支持录音转录和要点提取',
          language: '多语言',
          complexity: '中级',
          popularity: 84,
          usageCount: 9876,
          lastUpdated: '2026-03-15',
          tags: ['会议纪要', '转录', '要点提取']
        },
        {
          id: 'bookstack',
          name: 'bookstack',
          description: 'BookStack Wiki 集成，支持文档 CRUD 和全文搜索',
          language: '多语言',
          complexity: '中级',
          popularity: 79,
          usageCount: 6543,
          lastUpdated: '2026-03-11',
          tags: ['BookStack', 'Wiki', '文档管理']
        },
        {
          id: 'knowledge-base',
          name: 'knowledge-base',
          description: '企业级 RAG 工具，一键索引本地文件夹构建私有知识库',
          language: '多语言',
          complexity: '高级',
          popularity: 92,
          usageCount: 14567,
          lastUpdated: '2026-03-21',
          tags: ['RAG', '知识库', '索引']
        },
        {
          id: 'file-organizer',
          name: 'file-organizer',
          description: '智能文件整理，自动分类、重命名、归档',
          language: '多语言',
          complexity: '初级',
          popularity: 80,
          usageCount: 7654,
          lastUpdated: '2026-03-13',
          tags: ['文件管理', '分类', '归档']
        }
      ]
    },
    {
      id: 'requirements',
      name: '需求拆解 Skills',
      icon: '📋',
      description: '需求分析和拆解相关的技能和工具',
      skills: [
        {
          id: 'task-decomposer',
          name: 'task-decomposer',
          description: '将复杂需求拆解为可执行的任务清单',
          language: '多语言',
          complexity: '中级',
          popularity: 89,
          usageCount: 12345,
          lastUpdated: '2026-03-19',
          tags: ['需求拆解', '任务管理', '规划']
        },
        {
          id: 'decision-trees',
          name: 'decision-trees',
          description: '决策树分析工具，评估多选项风险/回报',
          language: '多语言',
          complexity: '高级',
          popularity: 85,
          usageCount: 8765,
          lastUpdated: '2026-03-16',
          tags: ['决策树', '分析', '风险评估']
        },
        {
          id: 'adversarial-prompting',
          name: 'adversarial-prompting',
          description: '对抗性分析，生成/批评/修复复杂问题解决方案',
          language: '多语言',
          complexity: '高级',
          popularity: 87,
          usageCount: 9876,
          lastUpdated: '2026-03-17',
          tags: ['对抗性分析', '问题解决', '优化']
        },
        {
          id: 'cross-pollination-engine',
          name: 'cross-pollination-engine',
          description: '跨领域创新引擎，借鉴其他行业思路解决问题',
          language: '多语言',
          complexity: '高级',
          popularity: 90,
          usageCount: 10987,
          lastUpdated: '2026-03-20',
          tags: ['创新', '跨领域', '问题解决']
        },
        {
          id: 'creative-thought-partner',
          name: 'creative-thought-partner',
          description: '创意思维伙伴，帮助探索想法和发现突破性见解',
          language: '多语言',
          complexity: '中级',
          popularity: 86,
          usageCount: 11234,
          lastUpdated: '2026-03-18',
          tags: ['创意', '头脑风暴', '思维']
        }
      ]
    },
    {
      id: 'database',
      name: '数据库/SQL Skills',
      icon: '🗄️',
      description: '数据库和SQL相关的技能和工具',
      skills: [
        {
          id: 'sql-optimizer',
          name: 'sql-optimizer',
          description: 'SQL 查询优化器，分析执行计划并提供索引建议',
          language: 'SQL',
          complexity: '高级',
          popularity: 91,
          usageCount: 13456,
          lastUpdated: '2026-03-22',
          tags: ['SQL', '优化', '索引']
        },
        {
          id: 'db-optimizer',
          name: 'db-optimizer',
          description: '数据库性能优化，支持慢查询分析和调优',
          language: '多语言',
          complexity: '高级',
          popularity: 88,
          usageCount: 12345,
          lastUpdated: '2026-03-20',
          tags: ['数据库', '性能优化', '慢查询']
        },
        {
          id: 'volcengine-rds-mysql',
          name: 'volcengine-rds-mysql',
          description: '火山引擎 MySQL 专属 Skill，支持实例管理、数据查询、性能监控、故障排查',
          language: 'SQL',
          complexity: '中级',
          popularity: 83,
          usageCount: 7654,
          lastUpdated: '2026-03-15',
          tags: ['火山引擎', 'RDS', 'MySQL']
        },
        {
          id: 'backup-gen',
          name: 'backup-gen',
          description: '数据库备份脚本生成器，支持 S3/GCS/本地存储',
          language: '多语言',
          complexity: '中级',
          popularity: 80,
          usageCount: 6543,
          lastUpdated: '2026-03-12',
          tags: ['备份', '脚本', '存储']
        },
        {
          id: 'data-cleaner',
          name: 'data-cleaner',
          description: '数据清洗工具，处理缺失值、重复记录、格式标准化',
          language: '多语言',
          complexity: '中级',
          popularity: 85,
          usageCount: 9876,
          lastUpdated: '2026-03-17',
          tags: ['数据清洗', '数据处理', '标准化']
        }
      ]
    }
  ]);

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 处理技能点击事件
  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setIsDetailOpen(true);
  };

  // 关闭详情面板
  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedSkill(null);
  };

  return (
    <div className="skill-management">
      <div className="skill-header">
        <h2>Skills管理</h2>
        <div className="skill-info">
          <span>总共有 {skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0)} 个可用Skill</span>
        </div>
      </div>

      <div className="skill-content">
        {/* Skill分类列表 */}
        <div className="skill-categories">
          {skillCategories.map(category => (
            <div key={category.id} className="skill-category">
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h3>{category.name}</h3>
                <span className="category-count">({category.skills.length})</span>
              </div>
              <p className="category-description">{category.description}</p>
              
              {/* 分类下的Skill列表 */}
              <div className="skill-list">
                {category.skills.map(skill => (
                  <div 
                    key={skill.id} 
                    className="skill-card"
                    onClick={() => handleSkillClick(skill)}
                  >
                    <div className="skill-card-header">
                      <div className="skill-card-info">
                        <h3>{skill.name}</h3>
                        <p className="skill-card-description">{skill.description}</p>
                      </div>
                    </div>
                    
                    <div className="skill-meta">
                      <div className="meta-item">
                        <span className="meta-label">语言:</span>
                        <span className="meta-value">{skill.language}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">复杂度:</span>
                        <span className={`meta-value complexity-${skill.complexity.toLowerCase()}`}>
                          {skill.complexity}
                        </span>
                      </div>
                    </div>
                    
                    <div className="skill-popularity">
                      <div className="popularity-bar">
                        <div 
                          className="popularity-progress"
                          style={{ width: `${skill.popularity}%` }}
                        ></div>
                      </div>
                      <div className="popularity-text">
                        热度: {skill.popularity}/100
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skill详情面板 */}
        {isDetailOpen && selectedSkill && (
          <div className="skill-detail-panel">
            <div className="detail-header">
              <h3>{selectedSkill.name} 详情</h3>
              <button className="close-btn" onClick={handleCloseDetail}>×</button>
            </div>
            
            <div className="detail-content">
              <div className="detail-section">
                <div className="skill-icon-large">{selectedSkill.icon}</div>
                <h4>{selectedSkill.name}</h4>
                <div className="skill-category-large">{selectedSkill.category}</div>
              </div>
              
              <div className="detail-section">
                <h4>描述</h4>
                <p className="skill-full-description">{selectedSkill.description}</p>
              </div>
              
              <div className="detail-section">
                <h4>技术信息</h4>
                <div className="detail-grid">
                  <div className="detail-field">
                    <span className="field-label">支持语言:</span>
                    <span className="field-value">{selectedSkill.language}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">复杂度:</span>
                    <span className={`field-value complexity-${selectedSkill.complexity.toLowerCase()}`}>
                      {selectedSkill.complexity}
                    </span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">使用次数:</span>
                    <span className="field-value">{selectedSkill.usageCount.toLocaleString()}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">最后更新:</span>
                    <span className="field-value">{selectedSkill.lastUpdated}</span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h4>热度</h4>
                <div className="popularity-full">
                  <div className="popularity-bar-large">
                    <div 
                      className="popularity-progress-large"
                      style={{ width: `${selectedSkill.popularity}%` }}
                    ></div>
                  </div>
                  <div className="popularity-score">
                    {selectedSkill.popularity}/100
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h4>标签</h4>
                <div className="detail-tags">
                  {selectedSkill.tags.map((tag, index) => (
                    <span key={index} className="detail-tag">{tag}</span>
                  ))}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>操作</h4>
                <div className="detail-actions">
                  <button className="action-btn use-btn">使用Skill</button>
                  <button className="action-btn config-btn">配置Skill</button>
                  <button className="action-btn delete-btn">删除Skill</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillManagement;