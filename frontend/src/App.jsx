import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import LandingPage from "./pages/LandingPage";  // Fixed import path
=======

// **Frontend Components**
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";

// **Pages**
>>>>>>> db00dad000f31c5fba1c58aac9dbd0d63b22d437
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OrderStatus from "./pages/OrderStatus";
<<<<<<< HEAD
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
=======
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

// **CSS and Styling**
// Import your main CSS (if needed)

>>>>>>> db00dad000f31c5fba1c58aac9dbd0d63b22d437
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
<<<<<<< HEAD
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
=======
        <Header />
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
>>>>>>> db00dad000f31c5fba1c58aac9dbd0d63b22d437
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/order-verification" element={<OrderVerification />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/order-status/:orderId" element={<OrderStatus />} />
<<<<<<< HEAD
            <Route path="/order" element={<OrderPage />} />  
            <Route path="/order-history" element={<OrderHistory />} />  
            <Route path="/otp-verification" element={<OTPVerification />} /> 
=======
            <Route path="/order" element={<OrderPage />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/otp-verification" element={<OTPVerification />} />
>>>>>>> db00dad000f31c5fba1c58aac9dbd0d63b22d437
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
