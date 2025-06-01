import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppcontext } from '../context/Appcontext';
import { assets } from '../assets/assets';
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser, setshowUserLogin, navigate, searchQuery, setSearchQuery,getCartCount, axios } = useAppcontext();
  const [showProfileMenu, setShowProfileMenu] = useState(false); 

 const logout = async () => {
  try {
    const { data } = await axios.get('/api/user/logout', { withCredentials: true });
    if (data.success) {
      toast.success(data.message);
      setUser(null);
      localStorage.removeItem("user"); // also clear storage
      navigate('/');
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};



  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);
  

  const toggleProfileMenu = () => {
    setShowProfileMenu((prevState) => !prevState);
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all flex-wrap">
      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-2">
  <img
    className="h-14"
    src="https://img.icons8.com/color/96/000000/grocery-store.png"
    alt="Grocery Store Icon"
  />
  <img src={assets.logo} alt="Grocify Logo" className="h-25 lg:h-25"/>

</NavLink>


      {/* Toggle button for mobile */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="sm:hidden ml-auto"
      >
        <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Nav Links */}
      <div
        className={`${open ? 'flex' : 'hidden sm:flex'} w-full sm:w-auto flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 mt-4 sm:mt-0`}
      >
        <NavLink to="/" onClick={() => setOpen(false)} className="hover:text-[#4fbf8b] transition font-medium">
          Home
        </NavLink>
        <NavLink to="/products" onClick={() => setOpen(false)} className="hover:text-[#4fbf8b] transition font-medium">
          All Products
        </NavLink>

        
        <NavLink to="/contact" onClick={() => setOpen(false)} className="hover:text-[#4fbf8b] transition font-medium">
          Contact
        </NavLink>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input onChange={(e)=> setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path clipRule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Cart */}
        <div className="relative cursor-pointer">
  <NavLink to="/cart">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M2.5 2.5H4.167L5.833 12.5h8.334l1.666-7.5H5"
        stroke="#4fbf8b"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="17" r="1" fill="#4fbf8b" />
      <circle cx="14" cy="17" r="1" fill="#4fbf8b" />
    </svg>
    <span className="absolute -top-2 -right-3 bg-[#4fbf8b] text-white text-xs w-[18px] h-[18px] flex items-center justify-center rounded-full">
      {getCartCount()}
    </span>
  </NavLink>
</div>


        {/* Conditional Login/Logout/Profile Button */}
        {!user ? (
          <NavLink
            to="/login"
            onClick={() => {
              setOpen(false);
              setshowUserLogin(true);
            }}
            className="cursor-pointer px-6 py-2 bg-[#4fbf8b] hover:bg-[#44ae7c] transition text-white rounded-full text-sm"
          >
            Login
          </NavLink>
        ) : (
          <div className="relative">
            {/* My Profile Section */}
            <button
              onClick={toggleProfileMenu}
              className="flex items-center gap-2 px-6 py-2 bg-[#4fbf8b] hover:bg-[#44ae7c] transition text-white rounded-full text-sm"
            >
              <img
                className="w-6 h-6 rounded-full"
                src={user?.profilePic || "https://img.icons8.com/ios/452/user.png"} // User profile picture
                alt="User Profile"
              />
              <span>My Profile</span>
            </button>
            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 p-2">
                <NavLink
                  to="/orders"
                  onClick={() => {
                    setOpen(false);
                    setShowProfileMenu(false); // Close the profile menu when an option is clicked
                  }}
                  className="block text-sm px-4 py-2 text-gray-700 hover:bg-[#4fbf8b] hover:text-white"
                >
                  My Orders
                </NavLink>
                <button
                  onClick={logout}
                  className="block text-sm px-4 py-2 text-gray-700 hover:bg-[#4fbf8b] hover:text-white w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
