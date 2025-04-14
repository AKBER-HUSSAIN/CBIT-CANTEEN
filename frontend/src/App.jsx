import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// ✅ Common Layout Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// ✅ Pages
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OTPVerification from "./pages/OTPVerification";
import MenuPage from "./pages/MenuPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import ChefDashboard from "./pages/ChefDashboard";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderVerification from "./pages/OrderVerification";
import OrderStatus from "./pages/OrderStatus";
import MenuPage from "./pages/MenuPage";  // Import MenuPage
import CategoryPage from "./pages/CategoryPage";  // Import CategoryPage
import CartPage from "./pages/CartPage";  // Import CartPage
import ChefDashboard from "./pages/ChefDashboard";  // Import ChefDashboard
import OrderConfirmation from "./pages/OrderConfirmation";  // Import OrderConfirmation
import OrderVerification from "./pages/OrderVerification";  // Import OrderVerification
import OTPVerification from "./pages/OTPVerification";  // Import OTPVerification
import WalletPage from "./pages/WalletPage";  // Import WalletPage
import OrderPage from "./pages/OrderPage";  // Import OrderPage
import OrderHistory from "./pages/OrderHistory";  // Import OrderHistory
// **CSS and Styling**
// Import your main CSS (if needed)

const App = () => {
  return (
    <Router>
      {/* ✅ Header shown on all pages */}
      <Header />

      <Routes>
        {/* Define routes for all pages */}
        <Route path="/" element={<RoleSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp-verification" element={<OTPVerification />} />

        {/* ✅ User Routes */}
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/:category" element={<CategoryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/order-status" element={<OrderStatus />} />
        <Route path="/order-status/:orderId" element={<OrderStatus />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/wallet" element={<WalletPage />} />

        {/* ✅ Chef Routes */}
        <Route path="/chef-dashboard" element={<ChefDashboard />} />
        <Route path="/order-verification" element={<OrderVerification />} />
      </Routes>

      {/* ✅ Footer (static) */}
      <Footer />
    </Router>
  );
};

export default App;
