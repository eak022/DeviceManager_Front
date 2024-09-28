import React from "react";

const Sidebar = ({ filterByCategory }) => {
  // Function to call when a category is clicked
  const handleCategoryClick = (category) => {
    filterByCategory(category);
  };

  return (
    <div className="flex flex-col w-1/6 bg-base-200 text-base-content min-h-screen p-4 border-r border-gray-300 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Dashboard Menu</h2>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => handleCategoryClick("all")}
            className="block py-2 px-4 rounded hover:bg-base-300 w-full text-left"
          >
            All Products
          </button>
        </li>
        <li>
          <button
            onClick={() => handleCategoryClick("PC")}
            className="block py-2 px-4 rounded hover:bg-base-300 w-full text-left"
          >
            PC
          </button>
        </li>
        <li>
          <button
            onClick={() => handleCategoryClick("Laptop")}
            className="block py-2 px-4 rounded hover:bg-base-300 w-full text-left"
          >
            Laptop
          </button>
        </li>
        <li>
          <button
            onClick={() => handleCategoryClick("Phone")}
            className="block py-2 px-4 rounded hover:bg-base-300 w-full text-left"
          >
            Phone
          </button>
        </li>
        <li>
          <button
            onClick={() => handleCategoryClick("Tablet")}
            className="block py-2 px-4 rounded hover:bg-base-300 w-full text-left"
          >
            Tablet
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
