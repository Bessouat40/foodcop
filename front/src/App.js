import MainViewCustomMenu from './components/mainViewCustomMenu';
import React from 'react';
import NavBar from './components/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeekMenus from './components/mainViewWeekMenus';
import Home from './components/home';
import About from './components/about';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/customMenu" element={<MainViewCustomMenu />} />
        <Route exact path="/weekMenus" element={<WeekMenus />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
