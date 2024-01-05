import React from "react";
import { Reset } from "styled-reset";
import Header from "./components/Header";
import Table from "./components/Table";
import Contribution from "./components/Contribution";

const App = () => {
  return (
    <>
      <Reset />
      <Header />
      <div className=" w-[1200px] my-0 mx-auto pt-5">
        <Contribution />
        <Table />
      </div>
    </>
  );
};

export default App;
