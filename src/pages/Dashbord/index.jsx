import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ProductList from "../../components/productList";
import ProductService from "../../services/product.service";
import Swal from "sweetalert2";
import { useAuthContext } from "../../contexts/auth.context";
import { Link } from "react-router-dom";
import ProductSearch from "../../components/ProductSearch";

const Dashboard = () => {
  const [products, setProducts] = useState([]); // All products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products for search
  const [selectedCategory, setSelectedCategory] = useState("all"); // Selected category from Sidebar
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getAllProducts();
        if (response.status === 200) {
          setProducts(response.data);
          setFilteredProducts(response.data); // Initialize filtered products with all products
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.message || error.message,
          icon: "error",
        });
      }
    };
    fetchProducts();
  }, []);

  // Function to filter products by category from Sidebar
  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredProducts(products); // Show all products
    } else {
      const result = products.filter((product) =>
        product.category?.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(result);
    }
  };
  
  return (
    <div className="flex flex-1">
      {/* Sidebar */}
      <Sidebar filterByCategory={filterByCategory} />

      {/* Main Content */}
      <div className="flex-1 p-4 bg-gray-100 relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Product Dashboard</h1>

          {/* Search Component on the top right */}
          <ProductSearch
            products={products}
            setFilteredProducts={setFilteredProducts}
          />
        </div>

        {/* Product List */}
        <ProductList products={filteredProducts} selectedCategory={selectedCategory} />

        {/* Add Product Button for Admins and Moderators */}
        {user &&
          (user.roles.includes("ROLE_ADMIN") ||
            user.roles.includes("ROLES_MODERATOR")) && (
            <Link to="/AddProduct" className="btn btn-primary fixed bottom-4 right-4 z-20">
              Add Product
            </Link>
          )}
      </div>
    </div>
  );
};

export default Dashboard;
