// import React from "react";
import { useEffect } from 'react';
import { Reset } from 'styled-reset';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import SignUpConfirm from './pages/SignUpConfirm';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Reset />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/profile/:id" element={<ProfilePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/signup/confirm" element={<SignUpConfirm />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
