import React from "react";
import Card from "./card";
import { useProduct } from "../contexts/product.context";

const ProductList = ({ products, selectedCategory }) => {
  // จัดกลุ่มสินค้าตามประเภท
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="p-4 space-y-6">
      {Object.keys(groupedProducts).map((category) => {
        if (selectedCategory && selectedCategory !== "all" && category !== selectedCategory) return null;

        return (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedProducts[category].map((product) => (
                <Card
                  key={product.id}
                  id={product.id}
                  imageUrl={product.imageUrl}
                  name={product.name}
                  brand={product.brand}
                  price={product.price}
                  category={product.category}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
