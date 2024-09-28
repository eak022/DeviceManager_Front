import React, { useState, useEffect } from "react";

const ProductSearch = ({ products, setFilteredProducts }) => {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (keyword === "") {
      setFilteredProducts(products);
      return;
    }

    const result = products.filter((product) => {
      const name = product.name ? product.name.toLowerCase() : "";
      const category = product.category ? product.category.toLowerCase() : "";
      const brand = product.brand ? product.brand.toLowerCase() : "";
      const description = product.description ? product.description.toLowerCase() : "";
      const searchKeyword = keyword.toLowerCase();

      // Matching search keyword with name, category, brand, or description
      return (
        name.includes(searchKeyword) ||
        category.includes(searchKeyword) ||
        brand.includes(searchKeyword) ||
        description.includes(searchKeyword)
      );
    });

    setFilteredProducts(result);
  }, [keyword, products, setFilteredProducts]);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <label className="input input-bordered flex items-center gap-2 w-5/6">
      <input
        type="text"
        className="grow"
        placeholder="Search products"
        onChange={handleChange}
        value={keyword}
        aria-label="Search for products"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
};

export default ProductSearch;
