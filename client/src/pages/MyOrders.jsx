import React, { useEffect, useState } from 'react';
import { useAppcontext } from '../context/Appcontext';
import { dummyOrders } from '../assets/assets';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency } = useAppcontext();

  const fetchMyOrders = async () => {
    setMyOrders(dummyOrders);
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className='mt-20 px-6 pb-16 max-w-5xl mx-auto'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-8 border-b-2 w-max border-green-600'>
        MY ORDERS
      </h2>

      {myOrders.map((order, index) => (
        <div
          key={index}
          className='border border-gray-200 shadow-sm rounded-xl mb-6 p-6 bg-white'
        >
          <div className='flex flex-col md:flex-row justify-between text-sm text-gray-500 mb-4'>
            <span>OrderId : {order._id}</span>
            <span>Payment : {order.paymentType}</span>
            <span>Total Amount : {currency}{order.amount}</span>
          </div>

          {order.items.map((item, itemIndex) => (
            <div key={itemIndex} className='flex items-center gap-6'>
              {/* Product Image */}
              <div className='bg-green-50 p-3 rounded-lg'>
                <img
                  src={item.product.image[0]}
                  alt={item.product.name}
                  className='w-20 h-20 object-contain'
                />
              </div>

              {/* Product Details */}
              <div className='flex-1'>
                <h3 className='text-lg font-semibold text-gray-800'>
                  {item.product.name}
                </h3>
                <p className='text-gray-500 text-sm mb-2'>
                  Category: {item.product.category}
                </p>
                <div className='flex flex-wrap gap-6 text-sm text-gray-600'>
                  <p>Quantity: {item.quantity || 1}</p>
                  <p>Status: {order.status}</p>
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p className='text-green-600 font-semibold'>
                    Amount: {currency}{item.product.offerPrice * (item.quantity || 1)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
