import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import AttractionList from './component/AttractionList.tsx';
import AttractionDetail from './component/AttractionDetail.tsx';
import SearchPage from './component/SearchPage.tsx';
import NavBar from './component/NavBar.tsx';
import AttractionCard from './component/AttractionCard.tsx';
import Home from './component/Home.tsx';
import LandingPage from './component/LandingPage.tsx';
import DashboardPage from './component/DashboardPage.tsx';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/landing" element={<LandingPage/>} />
        <Route path="/attractions" element={<AttractionList />} />
        <Route path="/attraction/:location_id" element={<AttractionDetail />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;

