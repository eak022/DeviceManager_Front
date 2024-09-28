import { createContext, useContext, useState, useEffect } from 'react';
import ProductService from '../services/product.service';
import { useAuthContext } from './auth.context';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const { user } = useAuthContext(); // ใช้ AuthContext แทน Clerk

  const fetchProduct = async (id) => {
    try {
      const response = await ProductService.getProductById(id); // ค้นหาข้อมูลตาม ID
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  const fetchAllProducts = async () => {
    if (!user) return;
    try {
      const response = await ProductService.getAllProducts();
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllProducts();
  }, [user]);


  const addProduct = async (product) => {
    try {
      const response = await ProductService.createProduct(product);
      if (response.status === 200) {
        setProducts((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (id, newProduct) => {
    try {
      const response = await ProductService.updateProduct(id, newProduct);
      console.log("Update product response:", response.data); // ตรวจสอบข้อมูลที่ตอบกลับ
      if (response.status === 200) {
        setProducts((prev) =>
          prev.map((product) =>
            product.id === id ? { ...product, ...response.data } : product
          )
        );
        return response; // คืนค่าตอบกลับ
      }
    } catch (error) {
      console.log("Error updating product:", error);
      throw error; // ข้อผิดพลาดจะถูกจัดการใน EditProduct
    }
  };
  const deleteProduct = async (id) => {
  try {
    const response = await ProductService.deleteProduct(id);
    if (response.status === 200 || response.status === 204) {
      // อัปเดต state ทันที
      setProducts((prev) => prev.filter((product) => product.id !== id));
      // อัปเดต filteredProducts
      setFilteredProducts((prev) => prev.filter((product) => product.id !== id));
    }
  } catch (error) {
    console.log("Error deleting product:", error);
  }
};

  
  

  return (
    <ProductContext.Provider
      value={{ products, fetchProduct, addProduct, updateProduct, deleteProduct, fetchAllProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
