import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppcontext } from '../context/Appcontext';
// import ProductCard from './components/ProductCard'

import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';

const ProductCategory = () => {
  const { products } = useAppcontext();
  const { category } = useParams();

  const urlCategory = category.toLowerCase();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === urlCategory
  );

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === urlCategory
  );

  return (
    <div className="mt-16 px-4">
      {searchCategory && (
        <div className="mb-6 text-center">
          <p className="text-lg font-medium text-gray-500">
            {searchCategory.text.toUpperCase()}
          </p>
          <h2 className="text-3xl font-bold text-primary mt-1">
            {searchCategory.title}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-2 rounded-full"></div>
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">
          No products found in this category.
        </p>
      )}
    </div>
  );
};

export default ProductCategory;
