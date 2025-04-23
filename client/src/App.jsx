import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { ToastBar, Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import { useAppcontext } from './context/Appcontext';
import Login from './components/Login';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory'; 
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

const App = () => {
  const isSellerPath = useLocation().pathname.includes('seller');
  const { showUserLogin } = useAppcontext();

  return (
    <>
      {!isSellerPath && <Navbar />}
      {showUserLogin && <Login />}
      <Toaster />
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-14 xl:px-32"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </>
  );
};

export default App;
