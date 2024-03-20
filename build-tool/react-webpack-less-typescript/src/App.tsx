import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Comp1 from './components/comp1';
import Comp2 from './components/comp2';

const App: React.FC = () => {
  console.log('应该看不到这个console.log')
  return (
    <Router>

      <Link to="/">Comp1</Link><br />
      <Link to="/about">Comp2</Link><br />
      <Routes>
        <Route path="/" element={<Comp1 />} />
        <Route path="/about" element={<Comp2 />} />
      </Routes>
    </Router>
  );
};

export default App;