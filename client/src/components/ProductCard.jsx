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

  // Handle the click event for the image (navigate to product detail page)
  const handleImageClick = () => {
    navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
    window.scrollTo(0, 0);
  };

  return product && (
    <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
      <div className="group cursor-pointer flex items-center justify-center px-2" onClick={handleImageClick}>
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
          <p className="md:text-xl text-base font-medium text-primary">
            {currency}{product.offerPrice}{" "}
            <span className="text-gray-500/60 md:text-sm text-xs line-through">
              {currency}{product.price}
            </span>
          </p>
          <div className="text-primary">
            {count === 0 ? (
              <button
                className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/30 md:w-[80px] w-[64px] h-[34px] rounded text-primary font-medium"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the click from triggering the image onClick
                  addToCart(product._id);
                }}
              >
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/10 rounded select-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click from triggering the image onClick
                    removeProductCart(product._id);
                  }}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  -
                </button>
                <span className="w-5 text-center">{count}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click from triggering the image onClick
                    updateCartItem(product._id, count + 1);
                  }}
                  className="cursor-pointer text-md px-2 h-full"
                >
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
