// import React from "react";
import { Reset } from "styled-reset";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";
import LoginPage from "./pages/Login";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Reset />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
