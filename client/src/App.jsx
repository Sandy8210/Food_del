import React, { useState } from "react";
import Navbar from "./component/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./component/Footer/Footer";
import LoginPopup from "./component/LoginPopup/LoginPopup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/verify/Verify";

const App = () => {
  const [login, setLogin] = useState(false);

  return (
    <>
      <ToastContainer />
      {login && <LoginPopup setLogin={setLogin} />}
      <div className="app">
        <Navbar setLogin={setLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
