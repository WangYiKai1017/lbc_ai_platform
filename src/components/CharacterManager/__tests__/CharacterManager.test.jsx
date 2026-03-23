import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock CSS imports
jest.mock('../CharacterManager.css', () => ({}));

import CharacterManager from '../CharacterManager';

// 创建一个包装了Router的渲染函数
const renderWithRouter = (component, { route = '/characters' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(<Router>{component}</Router>);
};

describe('CharacterManager Component', () => {
  test('renders breadcrumb navigation correctly', () => {
    renderWithRouter(<CharacterManager />);
    
    // 测试面包屑导航
    expect(screen.getByText('主页')).toBeInTheDocument();
    expect(screen.getByText('角色管理')).toBeInTheDocument();
    expect(screen.getAllByText('›')).toHaveLength(2);
  });
  
  test('renders character list with correct information', () => {
    renderWithRouter(<CharacterManager />);
    
    // 测试角色列表
    expect(screen.getByText('林辰')).toBeInTheDocument();
    expect(screen.getByText('苏雨柔')).toBeInTheDocument();
    expect(screen.getByText('慕容风')).toBeInTheDocument();
    
    // 测试性别（通过角色名称的兄弟元素来测试）
    const characterCards = screen.getAllByText(/林辰|苏雨柔|慕容风/).map(name => name.closest('.character-card'));
    expect(characterCards).toHaveLength(3);
    
    // 检查每个角色卡片是否包含性别信息
    expect(characterCards[0]).toHaveTextContent('男');
    expect(characterCards[1]).toHaveTextContent('女');
    expect(characterCards[2]).toHaveTextContent('男');
    
    // 测试角色信息
    expect(screen.getAllByAltText('林辰')).toHaveLength(1);
    expect(screen.getAllByAltText('苏雨柔')).toHaveLength(1);
    expect(screen.getAllByAltText('慕容风')).toHaveLength(1);
  });
  
  test('shows character detail when a character is clicked', () => {
    renderWithRouter(<CharacterManager />);
    
    // 点击角色卡片
    const linChenCard = screen.getByText('林辰').closest('.character-card');
    fireEvent.click(linChenCard);
    
    // 测试角色详情页面
    expect(screen.getByText('← 返回列表')).toBeInTheDocument();
    const personSettingTexts = screen.getAllByText('人物设定');
    const detailTitle = personSettingTexts.find(text => text.closest('.detail-title'));
    expect(detailTitle).toBeInTheDocument();
    expect(screen.getByText('林辰')).toBeInTheDocument();
    expect(screen.getByText('性别：男')).toBeInTheDocument();
  });
  
  test('returns to character list when back button is clicked', () => {
    renderWithRouter(<CharacterManager />);
    
    // 点击角色卡片
    const linChenCard = screen.getByText('林辰').closest('.character-card');
    fireEvent.click(linChenCard);
    
    // 点击返回按钮
    fireEvent.click(screen.getByText('← 返回列表'));
    
    // 测试是否返回角色列表
    expect(screen.getByText('林辰')).toBeInTheDocument();
    expect(screen.getByText('苏雨柔')).toBeInTheDocument();
    expect(screen.getByText('慕容风')).toBeInTheDocument();
  });
  
  test('toggles AI chat dialog when button is clicked', () => {
    renderWithRouter(<CharacterManager />);
    
    // 测试AI助手按钮
    const aiToggleButton = screen.getByText('💬 AI助手');
    expect(aiToggleButton).toBeInTheDocument();
    
    // 初始状态下AI对话框应该是隐藏的
    const aiChatContainer = screen.getByText('AI角色助手').closest('.ai-chat-container');
    expect(aiChatContainer).toHaveClass('hidden');
    
    // 点击AI助手按钮
    fireEvent.click(aiToggleButton);
    
    // 测试AI对话框是否显示
    expect(aiChatContainer).not.toHaveClass('hidden');
    expect(screen.getByText('你好！我是你的AI助手，可以帮助你创建和完善角色设定。有什么需要我帮忙的吗？')).toBeInTheDocument();
    
    // 点击关闭按钮
    fireEvent.click(screen.getByLabelText('关闭聊天'));
    
    // 测试AI对话框是否隐藏
    expect(aiChatContainer).toHaveClass('hidden');
  });
});
