import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          CBIT Canteen
        </Link>
        <nav className="flex space-x-4">
          <Link to="/login" className="text-white hover:text-gray-200">
            Login
          </Link>
          <Link to="/signup" className="text-white hover:text-gray-200">
            Signup
          </Link>
          <Link to="/about" className="text-white hover:text-gray-200">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
