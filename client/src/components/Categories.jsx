import React from 'react';
import { categories } from '../assets/assets.js'; 
import { HiChevronRight } from 'react-icons/hi'; 
import { useNavigate } from 'react-router-dom'; 

const Categories = () => {
  const navigate = useNavigate(); // Initialize the navigate function for routing

  // Function to handle category click
  const handleCategoryClick = (category) => {
    console.log('Category clicked:', category.title); // Log the clicked category title
    navigate(`/products/${category.path.toLowerCase()}`); // Navigate to the category path
    scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <div>
      {/* Heading and arrow */}
      <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <HiChevronRight className="text-xl text-gray-600" />
      </div>

      {/* Categories Cards */}
      <div className="flex justify-start space-x-4 p-4 h-[40vh] overflow-x-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            className="w-[22%] bg-white rounded-lg shadow-lg overflow-hidden flex-shrink-0 transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out"
            onClick={() => handleCategoryClick(category)} // Attach the click handler on image container
          >
            <div className="relative h-[25vh] p-2"> {/* Padding for better spacing */}
              {/* Image fitting entirely inside the card */}
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover rounded-md border-4 border-white shadow-md"
              />
              {/* Light background overlay with opacity */}
              <div className="absolute inset-0 bg-black opacity-20 rounded-md"></div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-center">{category.title}</h3>
              <p className="text-sm text-gray-600 text-center mt-2">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
