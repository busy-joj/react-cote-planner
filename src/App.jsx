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
import CheckPassword from './pages/CheckPassword';
import Confirm from './pages/Confirm';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Reset />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/profile/:id" element={<ProfilePage />}></Route>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignUpPage />}></Route>
            <Route path="/signup/confirm" element={<SignUpConfirm />}></Route>
            <Route path="/confirm/:state" element={<Confirm />}></Route>
          </Route>
          <Route path="/login/check" element={<CheckPassword />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
