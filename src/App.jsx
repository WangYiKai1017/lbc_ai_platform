import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AIMiddleware from './components/AIMiddleware/AIMiddleware';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AIMiddleware page="requirements" />} />
          <Route path="/requirements" element={<AIMiddleware page="requirements" />} />
          <Route path="/kanban" element={<AIMiddleware page="kanban" />} />
          <Route path="/workflow" element={<AIMiddleware page="workflow" />} />
          <Route path="/agent" element={<AIMiddleware page="agent" />} />
          <Route path="/agent-capabilities" element={<AIMiddleware page="agent-capabilities" />} />
          <Route path="/models" element={<AIMiddleware page="models" />} />
          <Route path="/data" element={<AIMiddleware page="data" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
