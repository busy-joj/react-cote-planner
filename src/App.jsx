// import React from "react";
import { Reset } from "styled-reset";
import Header from "./components/Header";
import Table from "./components/Table";
import Contribution from "./components/Contribution";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/profile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Reset />
        <Header />
        <Routes>
          <Route path="/profile" element={<ProfilePage />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <div className="w-[1200px] my-0 mx-auto pt-5">
        <Contribution />
        <Table />
      </div> */}
    </>
  );
};

export default App;
