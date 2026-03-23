import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NovelEditor from './components/NovelEditor/NovelEditor';
import CharacterManager from './components/CharacterManager/CharacterManager';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<NovelEditor />} />
          <Route path="/editor" element={<NovelEditor />} />
          <Route path="/characters" element={<NovelEditor page="characters" />} />
          <Route path="/navigation" element={<NovelEditor page="navigation" />} />
          <Route path="/details" element={<NovelEditor page="details" />} />
          <Route path="/help" element={<NovelEditor page="help" />} />
          <Route path="/innovation" element={<NovelEditor page="innovation" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
