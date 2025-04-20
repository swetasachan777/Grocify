import React from 'react';
import { Link } from 'react-router-dom'; // Make sure this is imported
import desktopBanner from '../assets/main_banner_bg.png';
import mobileBanner from '../assets/main_banner_bg_sm.png';

const MainBanner = () => {
  return (
    <div className="relative w-full h-[75vh] bg-green-50 overflow-hidden">
      {/* Desktop Background Image */}
      <img
        src={desktopBanner}
        alt="Desktop Banner"
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
      />

      {/* Mobile Background Image */}
      <img
        src={mobileBanner}
        alt="Mobile Banner"
        className="absolute inset-0 w-full h-full object-cover block md:hidden"
      />

      {/* Text Overlay */}
      <div className="relative z-10 flex flex-col items-center md:items-start justify-center h-full px-6 md:px-20 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Freshness You Can Trust,<br />
          Savings You will Love!
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Link to="/products">
            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">
              Shop now
            </button>
          </Link>
          <Link to="/products">
            <button className="text-green-600 font-semibold hover:underline">
              Explore deals →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
