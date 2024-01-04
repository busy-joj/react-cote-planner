import { useState } from "react";
import { Reset } from "styled-reset";
import crawler from "../hooks/crawler";

async function App() {
  const data = await crawler;
  console.log(data);
  return (
    <>
      <Reset />
      <div>gd</div>
    </>
  );
}

export default App;
