import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// **Frontend Components**
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";  // Fixed import path

// **Pages**
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
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
import AddFoodItemPage from './pages/AddFoodItemPage';  // Import the Add Food Item Page
// **CSS and Styling**
// Import your main CSS (if needed)

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* <Header /> */}
        <main className="flex-grow">
          <Routes>
            {/* Define routes for all pages */}
            <Route path="/" element={<LandingPage />} /> 
          </Routes>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/order-status" element={<OrderStatus />} />
            
            {/* Route for Menu and Categories */}
            <Route path="/menu" element={<MenuPage />} /> {/* MenuPage route */}
            <Route path="/menu/:category" element={<CategoryPage />} /> {/* Dynamic category page route */}

            {/* Route for Cart */}
            <Route path="/cart" element={<CartPage />} /> {/* CartPage route */}

            {/* Route for Chef Dashboard */}
            <Route path="/chef-dashboard" element={<ChefDashboard />} /> {/* ChefDashboard route */}
            <Route path="/add-food-item" element={<AddFoodItemPage />} /> {/* Add Food Item Page */}
            {/* Route for Order Confirmation */}
            <Route path="/order-confirmation" element={<OrderConfirmation />} /> {/* OrderConfirmation route */}

            {/* Route for Order Verification */}
            <Route path="/order-verification" element={<OrderVerification />} /> {/* OrderVerification route */}
            <Route path="/wallet" element={<WalletPage />} />
            {/* Route for OTP Verification */}
            <Route path="/order-status/:orderId" element={<OrderStatus />} />
            <Route path="/order" element={<OrderPage />} />  {/* ✅ Add Order Page */}
            <Route path="/order-history" element={<OrderHistory />} />  {/* ✅ Add Order History */}
            <Route path="/otp-verification" element={<OTPVerification />} /> {/* OTPVerification route */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
