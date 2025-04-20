import React from 'react';
import Product_card from './Product_card';
import { useAppcontext } from '../context/Appcontext';

const Best_seller = () => {
  const { products } = useAppcontext();

  return (
    <div className="py-4 px-2">
      <h2 className="text-xl font-semibold mb-3">Best Sellers</h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 pb-2">
      {products
          .filter((product) => product.inStock)
          .map((product, index) => (
            <Product_card key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Best_seller;
