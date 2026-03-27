-- PostgreSQL DDL Schema for LMBTCOS-AI Platform
-- Generated from MOCK_DATA_SCHEMA.md
-- Date: 2026-03-27

-- 创建扩展（如果需要）
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 设置时区
SET TIMEZONE='Asia/Shanghai';

-- =============================================
-- 1. 文档管理 (Document Management)
-- =============================================

-- 文件系统节点表
CREATE TABLE IF NOT EXISTS file_system_nodes (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('folder', 'file')),
    icon VARCHAR(10),
    size VARCHAR(50),
    modified DATE,
    parent_id VARCHAR(50) REFERENCES file_system_nodes(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 文件元数据表（仅文件类型使用）
CREATE TABLE IF NOT EXISTS file_metadata (
    id VARCHAR(50) PRIMARY KEY REFERENCES file_system_nodes(id) ON DELETE CASCADE,
    file_type VARCHAR(50),
    content_type VARCHAR(100),
    file_path VARCHAR(500),
    uploaded_by VARCHAR(50),
    access_level VARCHAR(20) DEFAULT 'public'
);

-- =============================================
-- 2. 切片工具 (Slice Tool)
-- =============================================

-- 上传文件表
CREATE TABLE IF NOT EXISTS slice_files (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    size BIGINT NOT NULL,
    uploaded TIMESTAMP NOT NULL,
    status VARCHAR(20) CHECK (status IN ('uploaded', 'processing', 'processed')),
    user_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 文档页面表
CREATE TABLE IF NOT EXISTS document_pages (
    id VARCHAR(50) PRIMARY KEY,
    file_id VARCHAR(50) REFERENCES slice_files(id) ON DELETE CASCADE,
    page_number INT NOT NULL,
    content TEXT,
    selected BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 切片结果表
CREATE TABLE IF NOT EXISTS slice_results (
    id VARCHAR(50) PRIMARY KEY,
    file_id VARCHAR(50) REFERENCES slice_files(id) ON DELETE CASCADE,
    page_ids VARCHAR(1000), -- 存储选中的页面ID，逗号分隔
    processed_content TEXT, -- 处理后的结构化内容
    status VARCHAR(20) CHECK (status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- =============================================
-- 3. 模型管理 (Model Management)
-- =============================================

-- 模型路由器表
CREATE TABLE IF NOT EXISTS model_routers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
    icon VARCHAR(10),
    description TEXT,
    base_url VARCHAR(255) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('active', 'inactive', 'maintenance')),
    rate_limit VARCHAR(50),
    created DATE NOT NULL,
    last_updated DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 模型表
CREATE TABLE IF NOT EXISTS models (
    id VARCHAR(50) PRIMARY KEY,
    router_id VARCHAR(50) REFERENCES model_routers(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
    description TEXT,
    provider VARCHAR(100),
    context VARCHAR(50),
    price VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 4. 数据管理 (Data Management)
-- =============================================

-- 数据库实例表
CREATE TABLE IF NOT EXISTS database_instances (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('pgsql', 'elasticsearch', 'rocksdb')),
    icon VARCHAR(10),
    description TEXT,
    host VARCHAR(100) NOT NULL,
    port INT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('active', 'inactive', 'maintenance')),
    version VARCHAR(50),
    size VARCHAR(50),
    tables INT, -- 仅pgsql
    indices INT, -- 仅elasticsearch
    key_count VARCHAR(50), -- 仅rocksdb
    documents VARCHAR(50), -- 仅elasticsearch
    connections INT,
    uptime VARCHAR(100),
    last_backup TIMESTAMP,
    purpose VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 数据库特性表
CREATE TABLE IF NOT EXISTS database_features (
    id SERIAL PRIMARY KEY,
    database_id VARCHAR(50) REFERENCES database_instances(id) ON DELETE CASCADE,
    feature VARCHAR(100) NOT NULL,
    UNIQUE (database_id, feature)
);

-- =============================================
-- 5. MCP管理 (MCP Management)
-- =============================================

-- MCP工具表
CREATE TABLE IF NOT EXISTS mcp_tools (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
    icon VARCHAR(10),
    provider VARCHAR(100),
    address VARCHAR(255) NOT NULL,
    api_key VARCHAR(255) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('online', 'offline', 'maintenance')),
    version VARCHAR(50),
    description TEXT,
    usage_count BIGINT DEFAULT 0,
    last_used TIMESTAMP,
    response_time VARCHAR(50),
    availability VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MCP使用场景表
CREATE TABLE IF NOT EXISTS mcp_use_cases (
    id SERIAL PRIMARY KEY,
    tool_id VARCHAR(50) REFERENCES mcp_tools(id) ON DELETE CASCADE,
    use_case VARCHAR(100) NOT NULL,
    UNIQUE (tool_id, use_case)
);

-- MCP标签表
CREATE TABLE IF NOT EXISTS mcp_tags (
    id SERIAL PRIMARY KEY,
    tool_id VARCHAR(50) REFERENCES mcp_tools(id) ON DELETE CASCADE,
    tag VARCHAR(50) NOT NULL,
    UNIQUE (tool_id, tag)
);

-- =============================================
-- 6. 技能管理 (Skill Management)
-- =============================================

-- 技能分类表
CREATE TABLE IF NOT EXISTS skill_categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(10),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 技能表
CREATE TABLE IF NOT EXISTS skills (
    id VARCHAR(50) PRIMARY KEY,
    category_id VARCHAR(50) REFERENCES skill_categories(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    language VARCHAR(100),
    complexity VARCHAR(20) CHECK (complexity IN ('初级', '中级', '高级')),
    popularity INT CHECK (popularity BETWEEN 0 AND 100),
    usage_count BIGINT DEFAULT 0,
    last_updated DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 技能标签表
CREATE TABLE IF NOT EXISTS skill_tags (
    id SERIAL PRIMARY KEY,
    skill_id VARCHAR(50) REFERENCES skills(id) ON DELETE CASCADE,
    tag VARCHAR(50) NOT NULL,
    UNIQUE (skill_id, tag)
);

-- =============================================
-- 7. 看板页面 (KanbanLayer)
-- =============================================

-- 泳道表
CREATE TABLE IF NOT EXISTS swimlanes (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 故事卡表
CREATE TABLE IF NOT EXISTS story_cards (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    summary TEXT,
    description TEXT,
    status VARCHAR(20) CHECK (status IN ('待处理', '进行中', '测试中', '待测试', '已完成')),
    assignee_id VARCHAR(50),
    assignee_name VARCHAR(100),
    assignee_avatar VARCHAR(10),
    reporter_id VARCHAR(50),
    reporter_name VARCHAR(100),
    reporter_avatar VARCHAR(10),
    report_date DATE NOT NULL,
    due_date DATE,
    estimated_time VARCHAR(20),
    actual_time VARCHAR(20),
    token_usage VARCHAR(50),
    priority VARCHAR(20) CHECK (priority IN ('低', '中', '高', '紧急')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 故事卡-泳道关联表
CREATE TABLE IF NOT EXISTS story_card_swimlanes (
    card_id VARCHAR(50) REFERENCES story_cards(id) ON DELETE CASCADE,
    swimlane_id VARCHAR(50) REFERENCES swimlanes(id) ON DELETE CASCADE,
    order_index INT DEFAULT 0,
    PRIMARY KEY (card_id, swimlane_id)
);

-- 故事卡标签表
CREATE TABLE IF NOT EXISTS story_card_tags (
    id SERIAL PRIMARY KEY,
    card_id VARCHAR(50) REFERENCES story_cards(id) ON DELETE CASCADE,
    tag VARCHAR(50) NOT NULL,
    UNIQUE (card_id, tag)
);

-- 故事卡依赖关系表
CREATE TABLE IF NOT EXISTS story_card_dependencies (
    id SERIAL PRIMARY KEY,
    card_id VARCHAR(50) REFERENCES story_cards(id) ON DELETE CASCADE,
    dependency_type VARCHAR(20) CHECK (dependency_type IN ('parent', 'child')),
    related_card_id VARCHAR(50) REFERENCES story_cards(id) ON DELETE CASCADE,
    UNIQUE (card_id, dependency_type, related_card_id)
);

-- 故事卡检查清单表
CREATE TABLE IF NOT EXISTS story_card_checklists (
    id SERIAL PRIMARY KEY,
    card_id VARCHAR(50) REFERENCES story_cards(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    order_index INT DEFAULT 0
);

-- =============================================
-- 8. 需求拆解页面 (RequirementsLayer)
-- =============================================

-- 对话会话表
CREATE TABLE IF NOT EXISTS conversation_sessions (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50),
    title VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 对话消息表
CREATE TABLE IF NOT EXISTS conversation_messages (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(50) REFERENCES conversation_sessions(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    is_user BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 需求拆解生成的故事卡（与看板故事卡共享同一张表）
-- 注意：这里没有创建新表，因为需求拆解的故事卡与看板的故事卡结构相同
-- 可以通过添加一个source字段来区分来源，或者使用现有字段标记

-- =============================================
-- 9. 工作流页面 (WorkflowLayer)
-- =============================================

-- 工作流表
CREATE TABLE IF NOT EXISTS workflows (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    created_by VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 工作流节点表
CREATE TABLE IF NOT EXISTS workflow_nodes (
    id VARCHAR(50) PRIMARY KEY,
    workflow_id VARCHAR(50) REFERENCES workflows(id) ON DELETE CASCADE,
    card_id VARCHAR(50) REFERENCES story_cards(id),
    title VARCHAR(200) NOT NULL,
    summary TEXT,
    status VARCHAR(20) CHECK (status IN ('待处理', '进行中', '测试中', '待测试', '已完成')),
    x INT NOT NULL,
    y INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 工作流边表（依赖关系）
CREATE TABLE IF NOT EXISTS workflow_edges (
    id VARCHAR(50) PRIMARY KEY,
    workflow_id VARCHAR(50) REFERENCES workflows(id) ON DELETE CASCADE,
    source_node_id VARCHAR(50) REFERENCES workflow_nodes(id) ON DELETE CASCADE,
    target_node_id VARCHAR(50) REFERENCES workflow_nodes(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 工作流节点依赖关系表
CREATE TABLE IF NOT EXISTS workflow_node_dependencies (
    id SERIAL PRIMARY KEY,
    node_id VARCHAR(50) REFERENCES workflow_nodes(id) ON DELETE CASCADE,
    dependency_type VARCHAR(20) CHECK (dependency_type IN ('parent', 'child')),
    related_node_id VARCHAR(50) REFERENCES workflow_nodes(id) ON DELETE CASCADE,
    UNIQUE (node_id, dependency_type, related_node_id)
);

-- =============================================
-- 10. 通用表
-- =============================================

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user',
    avatar VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 系统日志表
CREATE TABLE IF NOT EXISTS system_logs (
    id SERIAL PRIMARY KEY,
    level VARCHAR(20) CHECK (level IN ('debug', 'info', 'warn', 'error')),
    module VARCHAR(100),
    message TEXT NOT NULL,
    user_id VARCHAR(50) REFERENCES users(id),
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 索引创建
-- =============================================

-- 文档管理索引
CREATE INDEX IF NOT EXISTS idx_file_system_parent_id ON file_system_nodes(parent_id);
CREATE INDEX IF NOT EXISTS idx_file_system_type ON file_system_nodes(type);

-- 切片工具索引
CREATE INDEX IF NOT EXISTS idx_slice_files_status ON slice_files(status);
CREATE INDEX IF NOT EXISTS idx_document_pages_file_id ON document_pages(file_id);

-- 模型管理索引
CREATE INDEX IF NOT EXISTS idx_model_routers_status ON model_routers(status);
CREATE INDEX IF NOT EXISTS idx_models_router_id ON models(router_id);

-- 数据管理索引
CREATE INDEX IF NOT EXISTS idx_database_instances_type ON database_instances(type);
CREATE INDEX IF NOT EXISTS idx_database_instances_status ON database_instances(status);

-- MCP管理索引
CREATE INDEX IF NOT EXISTS idx_mcp_tools_status ON mcp_tools(status);
CREATE INDEX IF NOT EXISTS idx_mcp_tools_type ON mcp_tools(type);

-- 技能管理索引
CREATE INDEX IF NOT EXISTS idx_skills_category_id ON skills(category_id);
CREATE INDEX IF NOT EXISTS idx_skills_complexity ON skills(complexity);

-- 看板索引
CREATE INDEX IF NOT EXISTS idx_story_cards_status ON story_cards(status);
CREATE INDEX IF NOT EXISTS idx_story_cards_assignee_id ON story_cards(assignee_id);
CREATE INDEX IF NOT EXISTS idx_story_cards_reporter_id ON story_cards(reporter_id);
CREATE INDEX IF NOT EXISTS idx_story_card_swimlanes_swimlane_id ON story_card_swimlanes(swimlane_id);

-- 对话索引
CREATE INDEX IF NOT EXISTS idx_conversation_messages_session_id ON conversation_messages(session_id);

-- 工作流索引
CREATE INDEX IF NOT EXISTS idx_workflow_nodes_workflow_id ON workflow_nodes(workflow_id);
CREATE INDEX IF NOT EXISTS idx_workflow_edges_workflow_id ON workflow_edges(workflow_id);
CREATE INDEX IF NOT EXISTS idx_workflow_edges_source_target ON workflow_edges(source_node_id, target_node_id);

-- =============================================
-- 触发器（用于自动更新时间戳）
-- =============================================

-- 创建更新时间戳的函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 为所有需要的表添加触发器
CREATE TRIGGER update_file_system_nodes_updated_at
    BEFORE UPDATE ON file_system_nodes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_model_routers_updated_at
    BEFORE UPDATE ON model_routers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_models_updated_at
    BEFORE UPDATE ON models
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_database_instances_updated_at
    BEFORE UPDATE ON database_instances
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mcp_tools_updated_at
    BEFORE UPDATE ON mcp_tools
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skill_categories_updated_at
    BEFORE UPDATE ON skill_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at
    BEFORE UPDATE ON skills
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_swimlanes_updated_at
    BEFORE UPDATE ON swimlanes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_story_cards_updated_at
    BEFORE UPDATE ON story_cards
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversation_sessions_updated_at
    BEFORE UPDATE ON conversation_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workflows_updated_at
    BEFORE UPDATE ON workflows
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workflow_nodes_updated_at
    BEFORE UPDATE ON workflow_nodes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 初始化数据（可选）
-- =============================================

-- 这里可以添加一些初始化数据
-- 例如默认的用户、角色、配置等

-- 示例：添加默认泳道
-- INSERT INTO swimlanes (id, title, order_index) VALUES
-- ('ready-for-dev', 'Ready for Dev', 1),
-- ('in-progress', 'In Progress', 2),
-- ('testing', 'Testing', 3),
-- ('completed', 'Completed', 4);

-- 示例：添加默认技能分类
-- INSERT INTO skill_categories (id, name, icon, description) VALUES
-- ('frontend', '前端开发 Skills', '🎨', '前端开发相关的技能和工具'),
-- ('backend', '后端开发 Skills', '⚙️', '后端开发相关的技能和工具');

COMMIT;