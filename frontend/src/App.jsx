import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WalletPage from "./pages/WalletPage";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import ChefDashboard from "./pages/ChefDashboardPage";
import "./App.css"; // Ensure global styles are imported
import OrderStatus from './pages/OrderStatus';
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/order-status" element={<OrderStatus />} />
        <Route path="/" element={<RoleSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/chef-dashboard" element={<ChefDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
