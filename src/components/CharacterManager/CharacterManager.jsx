import React, { useState } from 'react';
import './CharacterManager.css';
import Breadcrumb from './components/Breadcrumb';
import CharacterList from './components/CharacterList';
import AIChat from './components/AIChat';
import CharacterDetail from './components/CharacterDetail';

const CharacterManager = () => {
  // 模拟角色数据
  const [characters] = useState([
    {
      id: 1,
      name: '林辰',
      gender: '男',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      appearance: '身高180cm，剑眉星目，穿着深蓝色长袍，腰间佩剑',
      bio: '主角，年轻的剑客，性格沉稳，正义感强，为了查明家族真相踏上江湖',
      fullBio: '林辰，出身武林世家，父亲是著名剑客。15岁时家族遭灭门，幸得师傅相救。此后跟随师傅学艺十年，精通剑术和轻功。性格沉稳内敛，但面对不公之事会挺身而出。此次下山是为了查明家族灭门真相，同时寻找传说中的绝世武功秘籍。'
    },
    {
      id: 2,
      name: '苏雨柔',
      gender: '女',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      appearance: '身高165cm，长发披肩，穿着粉色衣裙，手持玉笛',
      bio: '女主角，医术高超的侠女，外表柔弱内心坚强，与主角不打不相识',
      fullBio: '苏雨柔，出身医药世家，从小跟随父亲学习医术。18岁时独自下山行医，救过许多江湖人士。性格温柔善良，但面对邪恶势力时绝不妥协。擅长用毒和解毒，同时会一些基本的武功自保。与主角在一次偶然的机会相遇，从此结伴而行。'
    },
    {
      id: 3,
      name: '慕容风',
      gender: '男',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
      appearance: '身高178cm，面容冷峻，穿着黑色劲装，背后背着一把大刀',
      bio: '反派角色，神秘组织的杀手，冷酷无情，但似乎有着不为人知的过去',
      fullBio: '慕容风，从小被神秘组织收养并训练成杀手。执行任务从未失败，被称为"冷面杀手"。性格冷酷无情，对任何人都保持距离。但在与主角的多次交锋中，逐渐暴露了内心的柔软之处。似乎与主角的家族有着某种联系。'
    }
  ]);

  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showAIChat, setShowAIChat] = useState(false);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const handleBackToList = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className="character-manager-container">
      {/* 面包屑导航 */}
      <Breadcrumb 
        path={[
          { name: '主页', url: '/' },
          { name: '角色管理', url: '/characters', current: !selectedCharacter },
          { name: selectedCharacter ? '人物设定' : '', url: '', current: !!selectedCharacter }
        ]} 
      />

      {/* 主内容区 */}
      <div className="character-content">
        {selectedCharacter ? (
          <CharacterDetail 
            character={selectedCharacter} 
            onBack={handleBackToList} 
          />
        ) : (
          <CharacterList 
            characters={characters} 
            onCharacterClick={handleCharacterClick} 
          />
        )}

        {/* AI对话框 */}
        <AIChat 
          isVisible={showAIChat} 
          onToggle={() => setShowAIChat(!showAIChat)} 
        />

        {/* AI对话框切换按钮 */}
        <button 
          className={`ai-toggle-button ${showAIChat ? 'active' : ''}`}
          onClick={() => setShowAIChat(!showAIChat)}
        >
          💬 AI助手
        </button>
      </div>
    </div>
  );
};

export default CharacterManager;