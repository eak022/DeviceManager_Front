import React from "react";
import Swal from "sweetalert2";
import { useAuthContext } from "../contexts/auth.context";
import { useProduct } from "../contexts/product.context";
import { Link } from "react-router-dom";

const Card = ({ id, imageUrl, name, brand, price, category }) => {
  const { user } = useAuthContext();
  const { deleteProduct } = useProduct();

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(id);
          Swal.fire("Deleted!", `Product id=${id} has been deleted.`, "success");
        } catch (err) {
          Swal.fire("Error!", `Error deleting product: ${err.message}`, "error");
        }
      }
    });
  };

  const handleBuy = () => {
    if (!user || !user.address) {
      Swal.fire({
        title: "No address found",
        text: "Please add an address in your profile before making a purchase.",
        icon: "warning",
        confirmButtonText: "Go to profile",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/profile"; // แก้ URL ของโปรไฟล์ให้ถูกต้อง
        }
      });
    } else {
      Swal.fire("Success!", "Product purchased successfully.", "success");
    }
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <Link to={`/product/${id}`}> {/* คลิกที่การ์ดจะไปที่หน้ารายละเอียดสินค้า */}
        <figure>
          <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>Brand: {brand}</p>
          <p>Price: ${price}</p>
          <p>Category: {category}</p>
        </div>
      </Link>
      <div className="card-actions justify-end">
        {user &&
          (user.roles.includes("ROLES_MODERATOR") || user.roles.includes("ROLE_ADMIN")) && (
            <>
              {user.roles.includes("ROLE_ADMIN") && (
                <button
                  className="btn btn-outline btn-error"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(id);
                  }}
                >
                  Delete
                </button>
              )}
              <Link to={`/edit/${id}`} className="btn btn-outline btn-warning">
                Edit
              </Link>
            </>
          )}
        {user && !user.roles.includes("ROLE_ADMIN") && (
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              handleBuy();
            }}
          >
            Buy
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
