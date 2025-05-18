import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./Pages/Homepage";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import Shop from "./Pages/Shop";
import ProductDetailedPage from "./Pages/ProductDetailedPage";
import CheckoutPage from "./Pages/CheckoutPage";
import LoginPage from "./Pages/LoginPage";
import OrderDetails from "./Pages/OrderDetails";
import GamingPage from "./Pages/GamingPage";
import BusinessPage from "./Pages/BusinessPage";
import StudentPage from "./Pages/StudentPage";
import ApplePage from "./Pages/BrandsPages/Apple";
import HpPage from "./Pages/BrandsPages/Hp";
import SamsungPage from "./Pages/BrandsPages/Samsung";
import AcerPage from "./Pages/BrandsPages/Acer";
import BudgetPage from "./Pages/BudgetPage";

function App() {
  const location = useLocation(); // Get the current route

  return (
    <>
      {/* Show Navbar on all pages except login & register */}
      {location.pathname !== "/login" && location.pathname !== "/register" && <Navbar />}

      {/* ToastContainer added here to ensure toast notifications work */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetailedPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage isRegister={false} />} />
        <Route path="/register" element={<LoginPage isRegister={true} />} />
        <Route path="/orderdetail" element={<OrderDetails />} />
        <Route path="/gaming" element={<GamingPage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/apple" element={<ApplePage />} />
        <Route path="/hp" element={<HpPage />} />
        <Route path="/samsung" element={<SamsungPage />} />
        <Route path="/acer" element={<AcerPage />} />
      </Routes>
    </>
  );
}

export default App;
