import React, { useState, useEffect } from 'react';
import { useAppcontext } from '../../context/Appcontext';
import toast from 'react-hot-toast';


const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate,axios} = useAppcontext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


 
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('/api/seller/login', { email, password });
      if (data.success) {
        setIsSeller(true);
        navigate('/seller');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const message =
    error.response?.data?.message || 'Something went wrong. Please try again.';
  toast.error(message);
    }
    
  };

  useEffect(() => {
    if (isSeller) {
      navigate('/seller');
    }
  }, [isSeller]);

  return (
    !isSeller && (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <form
          onSubmit={onSubmitHandler}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Seller Login</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seller@example.com"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default SellerLogin;
