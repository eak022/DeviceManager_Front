import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../contexts/product.context"; // Import useProduct context

const ProductDetailPage = () => {
  const { id } = useParams(); // Get product ID from URL
  const { fetchProduct } = useProduct(); // Use fetchProduct from context
  const [product, setProduct] = useState(null); // State to hold product data
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details by ID when the component mounts
    const getProduct = async () => {
      const fetchedProduct = await fetchProduct(id);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
      } else {
        // If product is not found, redirect to the home page
        navigate("/");
      }
    };
    getProduct();
  }, [id, fetchProduct, navigate]);

  if (!product) {
    return <p>Loading...</p>; // Display a loading message while fetching data
  }

  return (
    <div className="container mx-auto p-8">
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p>Brand: {product.brand}</p>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <p>Stock: {product.stock}</p>
          <p>Specifications: {product.specifications}</p>
          <p>Description: {product.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
