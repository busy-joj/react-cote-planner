// import React from "react";
import { useEffect } from 'react';
import { Reset } from 'styled-reset';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { supabaseClient } from './supabase/client';
import { userStore } from './store/store';

import Header from './components/Header';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';

const App = () => {
  const { setUserInfo } = userStore();
  useEffect(() => {
    supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const data = session.user.user_metadata;
        setUserInfo(data);
      } else if (event === 'SIGNED_OUT') {
        [window.localStorage, window.sessionStorage].forEach(storage => {
          Object.entries(storage).forEach(([key]) => {
            storage.removeItem(key);
          });
        });
      }
    });
  }, [setUserInfo]);

  return (
    <>
      <BrowserRouter>
        <Reset />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/profile/:id" element={<ProfilePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signUp" element={<SignUpPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
