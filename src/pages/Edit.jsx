import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useProduct } from "../contexts/product.context"; // Import the context

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProduct, updateProduct } = useProduct(); // Use the ProductContext

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: 0,
    specifications: "",
    category: "",
    stock: 0,
    description: "",
    imageUrl: "https://via.placeholder.com/150", // Default image placeholder
  });

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await fetchProduct(id); // Fetch the product data by ID
        if (productData) {
          setProduct(productData); // Set the fetched product data
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to fetch product data.",
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "An error occurred while fetching product data.",
          icon: "error",
        });
      }
    };

    loadProduct();
  }, [id, fetchProduct]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("Submitting data...", product);
        const response = await updateProduct(id, product);
        console.log("Update response:", response);
        if (response && response.status === 200) { // ตรวจสอบสถานะการตอบกลับ
            Swal.fire({
                title: "Success",
                text: "Product updated successfully",
                icon: "success",
            }).then(() => {
                navigate("/"); // Navigate to home page
            });
        }
    } catch (error) {
        console.error("Update failed:", error);
        Swal.fire({
            title: "Update Failed",
            text: error.response?.data?.message || error.message,
            icon: "error",
        });
    }
};

  const handleCancel = () => {
    navigate("/"); // Navigate back to the homepage when cancel is clicked
  };

  return (
    <div className="container flex flex-col items-center p-4 mx-auto space-y-6">
      <div className="card bg-base-100 w-full max-w-2xl shadow-2xl"> {/* Increased form width */}
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              required
              name="name"
              value={product.name || ""} // Ensure value is not null
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Brand</span>
            </label>
            <input
              type="text"
              placeholder="Enter brand"
              className="input input-bordered"
              required
              name="brand"
              value={product.brand || ""} // Ensure value is not null
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              placeholder="Enter price"
              className="input input-bordered"
              required
              name="price"
              value={product.price || ""} // Ensure value is not null
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Specifications</span>
            </label>
            <textarea
              placeholder="Enter specifications"
              className="input input-bordered"
              name="specifications"
              value={product.specifications || ""} // Ensure value is not null
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <input
              type="text"
              placeholder="Enter category"
              className="input input-bordered"
              required
              name="category"
              value={product.category || ""} // Ensure value is not null
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Stock</span>
            </label>
            <input
              type="number"
              placeholder="Enter stock"
              className="input input-bordered"
              required
              name="stock"
              value={product.stock || ""} // Ensure value is not null
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              type="text"
              placeholder="Enter image URL"
              className="input input-bordered"
              required
              name="imageUrl"
              value={product.imageUrl || ""} // Ensure value is not null
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              placeholder="Enter description"
              className="input input-bordered"
              name="description"
              value={product.description || ""} // Ensure value is not null
              onChange={handleChange}
            />
          </div>
          <div className="form-control mt-6 flex flex-row justify-end">
            <button className="btn btn-outline btn-primary" type="submit">
              Update
            </button>
            <button
              type="button"
              className="btn btn-outline btn-warning ml-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
