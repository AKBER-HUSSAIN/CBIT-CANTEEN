import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUtensils, FaHamburger, FaPizzaSlice, FaIceCream } from "react-icons/fa";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to <span className="text-blue-600">CBIT CanteenX</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Experience the best of campus dining with our diverse menu and quick service.
            Order your favorite meals with just a few clicks!
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/menu')}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              Order Now
            </button>
            <button 
              onClick={() => navigate('/menu')}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors border border-blue-600"
            >
              View Menu
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-blue-600 text-4xl mb-4">
              <FaHamburger />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quick Service</h3>
            <p className="text-gray-600">Get your food delivered to your table in minutes</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-blue-600 text-4xl mb-4">
              <FaPizzaSlice />
            </div>
            <h3 className="text-xl font-semibold mb-2">Diverse Menu</h3>
            <p className="text-gray-600">Choose from a wide variety of delicious options</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-blue-600 text-4xl mb-4">
              <FaIceCream />
            </div>
            <h3 className="text-xl font-semibold mb-2">Special Treats</h3>
            <p className="text-gray-600">Enjoy our daily specials and seasonal items</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
