import React, { useEffect, useState } from 'react';
import { useAppcontext } from '../../context/Appcontext';
import { assets } from '../../assets/assets';

const SellerOrders = () => {
  const { currency, axios } = useAppcontext();
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/seller');
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Failed to fetch all orders:', error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll bg-gray-50">
      <div className="md:p-10 p-4 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 border-gray-300">
          All Customer Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4"
            >
              {/* Buyer & Shipping Info */}
              <div className="flex flex-col md:flex-row justify-between text-sm text-gray-700">
                <div className="mb-4 md:mb-0">
                  <p className="font-semibold text-gray-900">Buyer:</p>
                  <p>{order.userId?.name || 'Unknown'}</p>
                  <p>{order.userId?.email}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900">Shipping Address:</p>
                  <p>{order.address?.firstName} {order.address?.lastName}</p>
                  <p>{order.address?.street}, {order.address?.city}</p>
                  <p>{order.address?.state}, {order.address?.zipcode}, {order.address?.country}</p>
                  <p>Phone: {order.address?.phone}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-2">
                <p className="font-semibold text-gray-900">Ordered Items:</p>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <img
                      src={item.product?.image[0] || assets.box_icon}
                      alt={item.product?.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium">
                        {item.product?.name || 'Product Name'}{' '}
                        <span className="text-sm text-gray-500">× {item.quantity}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Category: {item.product?.category || 'N/A'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment & Order Info */}
              <div className="flex flex-col md:flex-row justify-between text-sm text-gray-700 mt-2">
                <div>
                  <p><span className="font-semibold">Order ID:</span> {order._id}</p>
                  <p><span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <p><span className="font-semibold">Payment Method:</span> {order.paymentType}</p>
                  <p>
                    <span className="font-semibold">Payment Status:</span>{' '}
                    <span className={`font-semibold ${order.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                      {order.paymentType === 'COD' ? 'Cash on Delivery' : (order.isPaid ? 'Paid' : 'Pending')}
                    </span>
                  </p>
                  <p><span className="font-semibold">Total Amount:</span> {currency}{order.amount}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SellerOrders;
