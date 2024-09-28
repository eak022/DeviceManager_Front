import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Dashbord from '../pages/Dashbord';
import Register from '../pages/Register';
import Login from '../pages/Login';
import UserProfilePage from '../pages/UserProfilePage';
import EditProduct from '../pages/Edit';
import AddProduct from '../pages/AddProduct';
import ProductDetailPage from '../pages/Product';
import { ProductProvider } from '../contexts/product.context';


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />, // ใช้ Layout เป็น element หลัก
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'dashbord',
                element: (
                  <ProductProvider>
                    <Dashbord />
                  </ProductProvider>
                ),
              },
            {
                path: 'About',
                element: <About />,
            },
            {
                path: 'register',
                element: <Register />,
            },

            {
                path: 'login',
                element: <Login />,
            },

            
            {
                path: 'profile',
                element: <UserProfilePage />,
            },

            {
                path: 'edit/:id',
                element: <EditProduct />,
            },

            {
                path: 'edit/:id',
                element: <EditProduct />,
            },
            {
                path: 'AddProduct',
                element: <AddProduct />,
            },
            {
                path: 'product/:id',
                element: <ProductDetailPage />,
            },


            // เพิ่มเส้นทางอื่น ๆ ตามต้องการ  /product/:id
        ],
    },
]);

export default router;
