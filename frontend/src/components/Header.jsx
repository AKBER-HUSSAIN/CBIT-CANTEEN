import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-6xl bg-white/90 backdrop-blur-md shadow-lg rounded-2xl z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
          CBIT CanteenX
        </Link>
        <nav className="flex space-x-6">
          <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Login
          </Link>
          <Link to="/signup" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Signup
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
