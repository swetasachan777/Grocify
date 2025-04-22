import React from 'react';
import { useAppcontext } from '../context/Appcontext';
import { useNavigate } from 'react-router-dom';
const ProductCard = ({ product }) => {
  const {
    currency,
    addToCart,
    updateCartItem,
    removeProductCart,
    cartItems
  } = useAppcontext();

  const count = cartItems[product._id] || 0;
  const navigate = useNavigate();
  return product && (
    <div
  onClick={() => {
    navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
    window.scrollTo(0, 0);
  }}
  className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full"
>
      <div className="group cursor-pointer flex items-center justify-center px-2">
        <img
          className="group-hover:scale-105 transition max-w-26 md:max-w-36"
          src={product.image[0]}
          alt={product.name}
        />
      </div>
      <div className="text-gray-500/60 text-sm">
        <p>{product.category}</p>
        <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>

        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-indigo-500">
            {currency}${product.offerPrice}{" "}
            <span className="text-gray-500/60 md:text-sm text-xs line-through">
              {currency}${product.price}
            </span>
          </p>
          <div className="text-indigo-500">
            {count === 0 ? (
              <button
                className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium"
                onClick={() => addToCart(product._id)}
              >
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-indigo-500/25 rounded select-none">
                <button onClick={() => removeProductCart(product._id)} className="cursor-pointer text-md px-2 h-full">
                  -
                </button>
                <span className="w-5 text-center">{count}</span>
                <button onClick={() => updateCartItem(product._id, count + 1)} className="cursor-pointer text-md px-2 h-full">
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
