import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-500">
          CBIT Canteen
        </Link>
        <nav className="flex space-x-4">
          <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
            Login
          </Link>
          <Link to="/signup" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
            Signup
          </Link>
          <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
