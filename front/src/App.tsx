import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
//import Home from './component/Home';
import AttractionList from './component/AttractionList.tsx';
import AttractionDetail from './component/AttractionDetail.tsx';
import SearchPage from './component/SearchPage.tsx';
import NavBar from './component/NavBar.tsx';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
       {/* <Route path="/" element={<Home />} />*/}
        <Route path="/attractions" element={<AttractionList />} />
        <Route path="/attraction/:location_id" element={<AttractionDetail />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;

