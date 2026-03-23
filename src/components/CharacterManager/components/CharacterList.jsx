import React from 'react';

const CharacterList = ({ characters, onCharacterClick }) => {
  return (
    <div className="character-list">
      {characters.map((character) => (
        <div 
          key={character.id} 
          className="character-card"
          onClick={() => onCharacterClick(character)}
        >
          <div className="character-header">
            <img 
              src={character.avatar} 
              alt={character.name} 
              className="character-avatar"
            />
            <div className="character-info">
              <h3 className="character-name">{character.name}</h3>
              <p className="character-gender">{character.gender}</p>
            </div>
          </div>
          <div className="character-appearance">
            {character.appearance}
          </div>
          <div className="character-bio">
            {character.bio}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;