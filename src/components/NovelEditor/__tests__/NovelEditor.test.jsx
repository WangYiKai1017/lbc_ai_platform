import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock CSS imports
jest.mock('../NovelEditor.css', () => ({}));
jest.mock('../../CharacterManager/CharacterManager.css', () => ({}));

import NovelEditor from '../NovelEditor';

// 创建一个包装了Router的渲染函数
const renderWithRouter = (component, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(<Router>{component}</Router>);
};

describe('NovelEditor Component', () => {
  test('renders the main layout correctly', () => {
    renderWithRouter(<NovelEditor />);
    
    // 测试左侧导航栏
    expect(screen.getByText('小说编辑图')).toBeInTheDocument();
    expect(screen.getByText('章节编辑')).toBeInTheDocument();
    expect(screen.getByText('角色管理')).toBeInTheDocument();
    expect(screen.getByText('章节导航')).toBeInTheDocument();
    expect(screen.getByText('章节细节')).toBeInTheDocument();
    expect(screen.getByText('章节帮助')).toBeInTheDocument();
    expect(screen.getByText('章节创新')).toBeInTheDocument();
    
    // 测试顶部工具栏
    expect(screen.getByText('📝 小说编辑')).toBeInTheDocument();
    
    // 测试中间内容区
    expect(screen.getByText('第01章')).toBeInTheDocument();
    expect(screen.getByText('鹰击长空')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('请输入章节内容...')).toBeInTheDocument();
    
    // 测试右侧面板
    expect(screen.getByText('小说大纲')).toBeInTheDocument();
    expect(screen.getByText('小说大纲内容将在这里显示...')).toBeInTheDocument();
    expect(screen.getByText('AI剧情建议')).toBeInTheDocument();
    expect(screen.getByText('生成剧情')).toBeInTheDocument();
  });
  
  test('renders the sidebar with correct active state', () => {
    renderWithRouter(<NovelEditor />);
    
    // 测试当前页面高亮
    const chapterEditButton = screen.getByText('章节编辑');
    expect(chapterEditButton.closest('div')).toHaveClass('active');
  });
  
  test('renders the editable content editor', () => {
    renderWithRouter(<NovelEditor />);
    
    // 测试内容编辑器可编辑
    const contentEditor = screen.getByPlaceholderText('请输入章节内容...');
    expect(contentEditor).toBeInTheDocument();
    expect(contentEditor).toHaveAttribute('contenteditable', 'true');
  });
  
  test('renders editable chapter number and title', () => {
    renderWithRouter(<NovelEditor />);
    
    // 测试章节数可编辑
    const chapterNumber = screen.getByText('第01章');
    expect(chapterNumber).toBeInTheDocument();
    expect(chapterNumber).toHaveAttribute('contenteditable');
    
    // 测试章节名称可编辑
    const chapterTitle = screen.getByText('鹰击长空');
    expect(chapterTitle).toBeInTheDocument();
    expect(chapterTitle).toHaveAttribute('contenteditable');
  });
  
  test('renders the AI generate button', () => {
    renderWithRouter(<NovelEditor />);
    
    // 测试AI生成剧情按钮
    const generateButton = screen.getByText('生成剧情');
    expect(generateButton).toBeInTheDocument();
    expect(generateButton).toHaveAttribute('type', 'button');
  });
});