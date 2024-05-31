import React from 'react';
import LoginForm from './Component/LoginForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieForm from './Component/MovieForm';
import './App.css';
import AdminForm from './Component/AdminForm';


const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/movie" element={<MovieForm />}/>
      <Route path="/admin" element={<AdminForm/>}/>
    </Routes>
  </Router>
  );
};

export default App;
  