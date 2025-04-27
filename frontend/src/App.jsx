import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

// **Frontend Components**
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";

// **Pages**
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
import PersonalizedMealGenerator from './pages/PersonalizedMealGenerator';
import PredictOrderPage from './pages/PredictOrderPage';

const AppContent = () => {
  const location = useLocation();
  // Only show the white header on login and signup pages
  const showHeader = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="flex flex-col min-h-screen">
      {showHeader && <Header />}
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
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/order-verification" element={<OrderVerification />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/order-status/:orderId" element={<OrderStatus />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/personalized-meal" element={<PersonalizedMealGenerator />} />
          <Route path="/predict-orders" element={<PredictOrderPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;