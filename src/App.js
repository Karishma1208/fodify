import React from "react";
import MyRoute from "./components/route/MyRoute";
import { BrowserRouter } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyRoute />
      </div>
    </BrowserRouter>
  );
}

export default App;
