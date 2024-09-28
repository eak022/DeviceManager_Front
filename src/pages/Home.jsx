import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/auth.context'; // นำเข้า useAuthContext

const Home = () => {
    const { user } = useAuthContext(); // ใช้ useAuthContext เพื่อตรวจสอบสถานะการล็อกอิน
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            // ถ้ามีผู้ใช้ล็อกอินแล้ว ให้เปลี่ยนเส้นทางไปยังหน้าแดชบอร์ด
            navigate('/dashbord');
        }
    }, [user, navigate]);

    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage:
                    "url(https://gitlab.com/eak022/image_com/-/raw/main/Firefly_%E0%B8%9E%E0%B8%B7%E0%B9%89%E0%B8%99%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B9%80%E0%B8%A7%E0%B9%87%E0%B8%9B%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%82%E0%B8%B2%E0%B8%A2%E0%B8%AD%E0%B8%B8%E0%B8%9B%E0%B8%81%E0%B8%A3%E0%B8%93%E0%B9%8C%E0%B9%84%E0%B8%AD%E0%B8%97%E0%B8%B5_70183.jpg)",
            }}
        >
            <div className="hero-overlay bg-opacity-70 bg-black"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-6xl font-extrabold text-white drop-shadow-md tracking-wide">
                        Discover Cutting-Edge IT Products at Unbeatable Prices!
                    </h1>
                    <p className="mb-5 text-lg text-gray-300 drop-shadow-sm">
                        From computers and smartphones to accessories, we’ve got everything
                        you need. Shop with confidence and enjoy quality products with a
                        satisfaction guarantee.
                    </p>
                    <Link to="/login" className="btn btn-primary btn-lg px-8 py-4 font-semibold rounded-full shadow-lg transition transform hover:scale-105 hover:bg-blue-600">
                        Shop Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
