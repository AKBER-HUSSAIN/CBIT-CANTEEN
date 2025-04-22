import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";  // Fixed import path
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OrderStatus from "./pages/OrderStatus";
import MenuPage from "./pages/MenuPage";  
import CategoryPage from "./pages/CategoryPage";  
import CartPage from "./pages/CartPage";  
import ChefDashboard from "./pages/ChefDashboard";  
import OrderConfirmation from "./pages/OrderConfirmation";  
import OrderVerification from "./pages/OrderVerification";  
import OTPVerification from "./pages/OTPVerification";  
import WalletPage from "./pages/WalletPage";  
import OrderPage from "./pages/OrderPage";  
import OrderHistory from "./pages/OrderHistory";  
import AddFoodItemPage from './pages/AddFoodItemPage';  
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/order-status" element={<OrderStatus />} />
            <Route path="/menu" element={<MenuPage />} /> 
            <Route path="/menu/:category" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage />} /> 
            <Route path="/chef-dashboard" element={<ChefDashboard />} /> 
            <Route path="/add-food-item" element={<AddFoodItemPage />} /> 
            {/* Route for Order Confirmation */}
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/order-verification" element={<OrderVerification />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/order-status/:orderId" element={<OrderStatus />} />
            <Route path="/order" element={<OrderPage />} />  
            <Route path="/order-history" element={<OrderHistory />} />  
            <Route path="/otp-verification" element={<OTPVerification />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
