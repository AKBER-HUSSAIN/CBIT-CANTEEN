import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WalletPage from './pages/WalletPage';
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
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
