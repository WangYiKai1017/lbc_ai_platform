# 前端开发指南

## 项目概述

本项目是一个基于React和React Router的单页应用程序（SPA），采用了现代化的UI设计风格和清晰的组件化架构。

## 技术栈

- **React 19**：前端框架
- **React Router 7**：路由管理
- **Vite**：构建工具
- **Jest**：测试框架
- **ESLint**：代码质量检查

## 项目结构

```
frontend_framework/
├── src/
│   ├── components/          # 可复用组件
│   │   ├── NovelEditor/     # 编辑器主组件
│   │   └── CharacterManager/ # 角色管理组件
│   ├── assets/              # 静态资源
│   ├── App.jsx              # 应用入口组件
│   ├── App.css              # 全局样式
│   ├── main.jsx             # React渲染入口
│   └── index.css            # 全局基础样式
├── public/                  # 公共资源
├── .gitignore               # Git忽略文件
├── package.json             # 项目依赖
├── vite.config.js           # Vite配置
└── jest.config.cjs          # Jest配置
```

## 组件设计规范

### 1. 组件命名

- 使用PascalCase命名组件文件和组件名称
- 组件文件夹名与组件名保持一致
- 示例：`NovelEditor.jsx` 对应 `NovelEditor` 组件

### 2. 组件结构

```jsx
// 推荐的组件结构
import React from 'react';
import './ComponentName.css';

const ComponentName = ({ prop1, prop2 }) => {
  // 组件逻辑
  
  return (
    <div className="component-name">
      {/* 组件内容 */}
    </div>
  );
};

export default ComponentName;
```

### 3. 样式规范

- 每个组件使用独立的CSS文件，命名为`ComponentName.css`
- 使用BEM命名规范（Block__Element--Modifier）
- 采用CSS类名前缀，避免全局样式冲突
- 示例：`.novel-editor__sidebar`, `.nav-item--active`

### 4. 路由结构

路由定义在`App.jsx`中，使用React Router 7的`Routes`和`Route`组件：

```jsx
<Routes>
  <Route path="/" element={<NovelEditor />} />
  <Route path="/editor" element={<NovelEditor />} />
  <Route path="/characters" element={<NovelEditor page="characters" />} />
  {/* 其他路由 */}
</Routes>
```

## UI/UX 设计规范

### 1. 颜色方案

- **主色调**：#3498db（蓝色）
- **背景色**：#f8f9fa（浅灰）
- **卡片背景**：#ffffff（白色）
- **文字颜色**：#2c3e50（深灰）、#666（中灰）
- **边框颜色**：#e0e0e0（浅灰）

### 2. 排版

- **字体**：系统默认字体（-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif）
- **标题**：18-24px，600-700权重
- **正文**：14-16px，400-500权重
- **行高**：1.5-1.8

### 3. 间距与布局

- **容器内边距**：20-30px
- **组件间距**：15-25px
- **圆角**：8px（按钮、卡片）
- **阴影**：0 2px 8px rgba(0, 0, 0, 0.05)（卡片、导航栏）

### 4. 交互效果

- **悬停效果**：轻微背景色变化、微小位移（transform: translateY(-1px)）
- **点击效果**：轻微按下动画（transform: translateY(0)）
- **过渡动画**：0.2-0.3s ease

## 代码质量规范

### 1. ESLint配置

项目已配置ESLint，遵循React最佳实践。运行以下命令检查代码质量：

```bash
npm run lint
```

### 2. 测试

使用Jest和React Testing Library编写组件测试：

```bash
npm run test
```

### 3. 代码风格

- 使用函数式组件和Hooks
- 避免不必要的类组件
- 合理使用React Context进行状态管理
- 组件拆分遵循单一职责原则

## 开发流程

1. **安装依赖**：`npm install`
2. **启动开发服务器**：`npm run dev`
3. **构建生产版本**：`npm run build`
4. **预览生产版本**：`npm run preview`
5. **运行测试**：`npm run test`
6. **代码质量检查**：`npm run lint`

## 页面与功能规划

### 1. 主页面（page1）
- 内容编辑器
- 大纲面板
- AI建议面板

### 2. 角色管理（subpage1）
- 角色列表
- 角色详情
- 角色创建/编辑

### 3. 章节导航（page2）
- 章节列表
- 章节排序
- 章节跳转

### 4. 章节细节（page3）
- 章节属性编辑
- 章节关系管理

### 5. 帮助页面（page4）
- 使用指南
- 功能说明

### 6. 创新功能（page5）
- 实验性功能
- 高级编辑工具

## 后续开发建议

1. **状态管理**：考虑使用React Context或Zustand进行全局状态管理
2. **API集成**：规划与后端API的交互接口
3. **数据持久化**：实现本地存储或云端存储功能
4. **国际化**：支持多语言切换
5. **无障碍**：确保应用符合无障碍标准
6. **性能优化**：实现代码分割、懒加载等性能优化策略

## 团队协作规范

1. **分支管理**：使用Git Flow或GitHub Flow
2. **代码审查**：所有代码必须经过代码审查才能合并
3. **提交信息**：使用语义化提交信息（如：feat: add new feature）
4. **文档更新**：及时更新开发文档和API文档

## 问题反馈与支持

如有任何问题或建议，请通过项目管理工具或邮件反馈。