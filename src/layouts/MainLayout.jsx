import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../pages/Dashbord/Sidebar'; // ตรวจสอบเส้นทางให้ถูกต้อง

const MainLayout = () => {
  const location = useLocation();
  const showSidebar = location.pathname === '/dashboard'; // ตรวจสอบเส้นทางปัจจุบัน

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </header>
      {/* Content Area */}
      <main className="flex flex-1 mt-1 pt-16">
        {showSidebar && (
          <div className="fixed top-0 left-0 w-80 bg-gray-200 p-4 border-r border-gray-300 shadow-lg z-40"> {/* ใช้ fixed และ z-index */}
            <Sidebar />
          </div>
        )}
        <div className={`flex-1 p-4 bg-gray-100 ${showSidebar ? 'ml-80' : ''}`}>
          <Outlet />
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
