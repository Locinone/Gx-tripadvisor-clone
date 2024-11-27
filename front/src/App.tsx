import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import AttractionList from './component/AttractionList.tsx';
import AttractionCard from './component/AttractionCard.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AttractionList />} />
        <Route path="/card" element={<AttractionCard
          name="Test Attraction"
          description="This is a test description."
          imageUrl="https://www.mustgo.com/wp-content/uploads/2018/09/venice-main-image.jpg"
          rating={4.5}
          reviewsCount={123}
          price="100$"
        />} />
      </Routes>
    </Router>
  );
}

export default App;
