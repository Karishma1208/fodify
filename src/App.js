import React from "react";
import MyRoute from "./components/route/MyRoute";
import './components/Fontawesomeicons/font'
import Payment from './components/PayMent/Payment';
import Cart from "./components/cart/Cart";
import { BrowserRouter } from "react-router-dom";


import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyRoute />
        <Payment />
        <Cart />
      </div>
    </BrowserRouter>
  );
}

export default App;
