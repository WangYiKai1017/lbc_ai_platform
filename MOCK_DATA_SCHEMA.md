# 前端Mock数据结构文档

## 1. 文档管理 (Document Management)

### 文件系统节点
```json
{
  "id": "string",           // 唯一标识符
  "name": "string",         // 文件名或文件夹名
  "type": "string",         // 类型: folder, file
  "icon": "string",         // 图标emoji
  "size": "string",         // 文件大小 (文件夹为空字符串)
  "modified": "string",     // 最后修改时间 (YYYY-MM-DD格式)
  "children": [{...}]        // 子节点 (仅文件夹有此属性)
}
```

### 文件类型
- 文档类型: pdf, docx, md
- 电子表格: xlsx
- 演示文稿: pptx
- 图片: jpg, png
- 代码: js, ts, py, java

---

## 2. 切片工具 (Slice Tool)

### 上传文件
```json
{
  "id": "string",           // 唯一标识符
  "name": "string",         // 文件名
  "type": "string",         // 文件MIME类型
  "size": "number",         // 文件大小 (字节)
  "uploaded": "string",     // 上传时间 (ISO字符串)
  "status": "string"        // 状态: uploaded, processing, processed
}
```

### 文档页面
```json
{
  "id": "string",           // 唯一标识符
  "number": "number",       // 页码
  "content": "string",      // 页面内容预览
  "selected": "boolean"     // 是否被选中进行切片
}
```

---

## 3. 模型管理 (Model Management)

### 模型路由器
```json
{
  "id": "string",           // 唯一标识符
  "name": "string",         // 路由器名称
  "type": "string",         // 路由器类型
  "icon": "string",         // 图标emoji
  "description": "string",  // 描述
  "baseUrl": "string",      // API基础URL
  "status": "string",       // 状态: active, inactive, maintenance
  "models": [{...}],         // 可用模型列表
  "rateLimit": "string",    // 速率限制
  "created": "string",      // 创建时间 (YYYY-MM-DD格式)
  "lastUpdated": "string"   // 最后更新时间 (YYYY-MM-DD格式)
}
```

### 模型
```json
{
  "id": "string",           // 唯一标识符
  "name": "string",         // 模型名称
  "type": "string",         // 模型类型: 对话, 多模态, 代码, 推理, 长文本
  "description": "string",  // 描述
  "provider": "string",     // 提供商
  "context": "string",      // 上下文长度
  "price": "string"         // 价格
}
```

---

## 4. 数据管理 (Data Management)

### 数据库实例
```json
{
  "id": "string",           // 唯一标识符
  "name": "string",         // 数据库名称
  "type": "string",         // 数据库类型: pgsql, elasticsearch, rocksdb
  "icon": "string",         // 图标emoji
  "description": "string",  // 描述
  "host": "string",         // 主机地址
  "port": "number",         // 端口号
  "status": "string",       // 状态: active, inactive, maintenance
  "version": "string",      // 版本
  "size": "string",         // 存储大小
  "tables": "number",       // 表数量 (仅pgsql)
  "indices": "number",      // 索引数量 (仅elasticsearch)
  "keyCount": "string",     // 键数量 (仅rocksdb)
  "documents": "string",    // 文档数量 (仅elasticsearch)
  "connections": "number",  // 当前连接数
  "uptime": "string",       // 运行时间
  "lastBackup": "string",   // 最后备份时间 (YYYY-MM-DD HH:MM:SS格式)
  "purpose": "string",      // 用途
  "features": ["string"]    // 特性列表
}
```

---

## 5. MCP管理 (MCP Management)

### MCP工具
```json
{
  "id": "string",           // 唯一标识符
  "name": "string",         // 工具名称
  "type": "string",         // 工具类型: 浏览器自动化, 本地浏览器控制, UI组件生成, 代码仓库管理, 网页爬取
  "icon": "string",         // 图标emoji
  "provider": "string",     // 提供商
  "address": "string",      // 服务地址
  "apiKey": "string",       // API密钥
  "status": "string",       // 状态: online, offline, maintenance
  "version": "string",      // 版本
  "description": "string",  // 描述
  "usageCount": "number",   // 使用次数
  "lastUsed": "string",     // 最后使用时间 (YYYY-MM-DD HH:MM:SS格式)
  "responseTime": "string", // 响应时间
  "availability": "string", // 可用性百分比
  "useCases": ["string"],   // 使用场景列表
  "tags": ["string"]        // 标签列表
}
```

---

## 6. 技能管理 (Skill Management)

### 技能分类
```json
{
  "id": "string",           // 唯一标识符
  "name": "string",         // 分类名称
  "icon": "string",         // 图标emoji
  "description": "string",  // 分类描述
  "skills": [{...}]         // 技能列表
}
```

### 技能
```json
{
  "id": "string",           // 唯一标识符
  "name": "string",         // 技能名称
  "description": "string",  // 技能描述
  "language": "string",     // 支持的语言
  "complexity": "string",   // 复杂度: 初级, 中级, 高级
  "popularity": "number",   // 流行度 (0-100)
  "usageCount": "number",   // 使用次数
  "lastUpdated": "string",  // 最后更新时间 (YYYY-MM-DD格式)
  "tags": ["string"]        // 标签列表
}
```

---

## 7. 路由配置 (App.jsx)

```javascript
// 路由配置示例
<Route path="/documents" element={<AIMiddleware page="documents" />} />
<Route path="/slice-tool" element={<AIMiddleware page="slice-tool" />} />
<Route path="/models" element={<AIMiddleware page="models" />} />
<Route path="/data" element={<AIMiddleware page="data" />} />
<Route path="/mcp-management" element={<AIMiddleware page="mcp-management" />} />
<Route path="/skill-management" element={<AIMiddleware page="skill-management" />} />
```

---

## 7. 看板页面 (KanbanLayer)

### 泳道 (Swimlane)
```json
{
  "id": "string",           // 泳道唯一标识符
  "title": "string",        // 泳道标题
  "cards": [{...}]          // 泳道中的故事卡列表
}
```

### 故事卡 (StoryCard)
```json
{
  "id": "string",           // 故事卡唯一标识符
  "title": "string",        // 故事卡标题
  "summary": "string",      // 故事卡摘要
  "description": "string",  // 故事卡详细描述
  "status": "string",       // 状态: 待处理, 进行中, 测试中, 待测试, 已完成
  "assignee": {
    "id": "string",         // 执行者ID
    "name": "string",       // 执行者名称
    "avatar": "string"      // 执行者头像emoji
  },
  "reporter": {
    "id": "string",         // 报告者ID
    "name": "string",       // 报告者名称
    "avatar": "string"      // 报告者头像emoji
  },
  "tags": ["string"],       // 标签列表
  "reportDate": "string",   // 报告日期 (YYYY-MM-DD格式)
  "dueDate": "string",      // 截止日期 (YYYY-MM-DD格式)
  "estimatedTime": "string",// 估计时间 (如 "10d", "2w")
  "actualTime": "string",   // 实际时间 (如 "8d", "1.5w")
  "tokenUsage": "string",   // Token使用量
  "priority": "string",     // 优先级: 低, 中, 高, 紧急
  "parentDependencies": ["string"], // 父依赖卡片ID列表
  "childDependencies": ["string"],  // 子依赖卡片ID列表
  "checklist": [             // 检查清单
    {
      "text": "string",     // 检查项文本
      "completed": "boolean"// 是否完成
    }
  ]
}
```

---

## 8. 需求拆解页面 (RequirementsLayer)

### 对话消息 (Message)
```json
{
  "id": "number",           // 消息唯一标识符
  "text": "string",         // 消息内容 (支持Markdown格式)
  "isUser": "boolean"       // 是否为用户消息
}
```

### 故事卡 (StoryCard)
- 与看板页面的故事卡结构相同

---

## 9. 工作流页面 (WorkflowLayer)

### 节点 (Node)
```json
{
  "id": "string",           // 节点唯一标识符
  "title": "string",        // 节点标题
  "summary": "string",      // 节点摘要
  "status": "string",       // 状态: 待处理, 进行中, 测试中, 待测试, 已完成
  "parentDependencies": ["string"], // 父依赖节点ID列表
  "childDependencies": ["string"],  // 子依赖节点ID列表
  "x": "number",            // 节点在画布上的X坐标
  "y": "number"             // 节点在画布上的Y坐标
}
```

### 边 (Edge)
```json
{
  "id": "string",           // 边唯一标识符
  "source": "string",       // 源节点ID
  "target": "string"        // 目标节点ID
}
```

---

## 10. 页面组件结构

```
src/components/
├── AIMiddleware/
│   ├── DocumentManagement/
│   │   ├── DocumentManagement.jsx
│   │   └── DocumentManagement.css
│   ├── SliceTool/
│   │   ├── SliceTool.jsx
│   │   └── SliceTool.css
│   ├── ModelManagement/
│   │   ├── ModelManagement.jsx
│   │   └── ModelManagement.css
│   ├── DataManagement/
│   │   ├── DataManagement.jsx
│   │   └── DataManagement.css
│   ├── MCPManagement/
│   │   ├── MCPManagement.jsx
│   │   └── MCPManagement.css
│   ├── SkillManagement/
│   │   ├── SkillManagement.jsx
│   │   └── SkillManagement.css
│   └── AIMiddleware.jsx
├── KanbanLayer/
│   ├── KanbanLayer.jsx
│   └── KanbanLayer.css
├── RequirementsLayer/
│   ├── RequirementsLayer.jsx
│   ├── RequirementsLayer.css
│   ├── Lane.jsx
│   ├── StoryCard.jsx
│   ├── StoryCardDetail.jsx
│   └── MessageBubble.jsx
└── WorkflowLayer/
    ├── WorkflowLayer.jsx
    └── WorkflowLayer.css
```

---

## 11. 状态管理

所有页面组件使用React的useState钩子进行本地状态管理，主要状态包括：
- 数据列表（如文件列表、模型列表等）
- 选中项（当前操作的项）
- 详情面板显示状态
- 处理状态（如切片工具的处理状态）

---

## 12. 交互模式

### 列表+详情模式
所有管理页面（模型、数据、MCP、技能）都采用列表+详情的交互模式：
1. 左侧显示项目列表（卡片或表格形式）
2. 点击列表项在右侧显示详细信息
3. 支持关闭详情面板返回列表

### 文件浏览器模式
文档管理页面采用文件浏览器模式：
1. 树状结构展示文件系统
2. 支持文件夹展开/折叠
3. 点击文件显示文件详情
4. 提供文件操作功能（打开、下载、分享、删除）

### 上传+处理模式
切片工具页面采用上传+处理模式：
1. 左侧管理上传的文件
2. 右侧预览文档并选择页面
3. 支持批量选择和处理
4. 显示处理进度和状态

---

## 13. 数据格式规范

### 日期时间格式
- 日期: YYYY-MM-DD (如 "2026-03-25")
- 日期时间: YYYY-MM-DD HH:MM:SS (如 "2026-03-25 14:30:45")
- 上传时间: ISO 8601字符串 (如 "2026-03-25T14:30:45.000Z")

### 大小格式
- 文件大小: 使用KB, MB, GB等单位 (如 "2.5 MB", "850 KB")
- 存储大小: 使用GB, TB等单位 (如 "128 GB", "512 GB")

### 状态值
- 通用状态: active, inactive, maintenance
- 文件状态: uploaded, processing, processed
- 服务状态: online, offline

---

## 14. 未来扩展建议

1. **数据持久化**：使用API替代本地mock数据
2. **状态管理**：引入Redux或Context API进行全局状态管理
3. **权限控制**：为不同用户角色添加访问权限控制
4. **搜索功能**：在各管理页面添加搜索和过滤功能
5. **分页**：对大数据量的列表添加分页支持
6. **批量操作**：支持对多个项目进行批量操作
7. **导出功能**：支持将数据导出为Excel、CSV等格式
8. **日志记录**：记录用户操作和系统事件