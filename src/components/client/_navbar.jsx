import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Drawer,
    Button,
    Space,
    Dropdown,
    Avatar,
    message
} from 'antd';
import {
    UserOutlined,
    MenuOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setLogoutAction } from '../../redux/slice/accountSlide';
import { callLogout } from '../../config/api.auth';

const Navbar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const dispatch = useDispatch();
    const [current, setCurrent] = useState('/');
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setCurrent(location.pathname);
    }, [location]);

    const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
    const user = useSelector((state) => state.account.user);

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res && +res.statusCode === 200) {
            dispatch(setLogoutAction({}));
            message.success('Đăng xuất thành công');
        }
    };

    const showDrawer = () => {
        setIsDrawerOpen(true);
    };

    const profileMenuItems = [
        {
            label: `Xin chào, ${user?.fullname}`,
        },
        {
            key: 'profile',
            label: <Link to="/profile">Thông tin cá nhân</Link>,
        },
        user.roleName !== 'GUEST'
            ? {
                key: 'system',
                label: <Link to='/admin/dashboard'>Trang quản trị</Link>,
            } : null,
        {
            key: 'bookings',
            label: <Link to="/bookings">Đơn đặt phòng</Link>,
        },
        {
            key: 'logout',
            label: <a onClick={handleLogout}>Đăng xuất</a>,
        },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? 'bg-primary shadow-lg' : 'bg-transparent'
        }`}>
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center space-x-4">
                        <i className="fas fa-hotel text-2xl text-gold" />
                        <span className={`text-2xl font-bold ${isScrolled ? 'text-white' : 'text-white'}`}>
                            Furama Hotel
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex flex-1 justify-center space-x-8">
                        <Link
                            to="/"
                            className={`relative py-2 hover:text-yellow-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-yellow-500 
                            ${current === '/' ? 'text-yellow-500 after:scale-x-100' : `${isScrolled ? 'text-white' : 'text-white'} after:scale-x-0`} 
                            hover:after:scale-x-100 after:transition-transform after:duration-300`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/all-rooms"
                            className={`relative py-2 hover:text-yellow-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-yellow-500 
                            ${current === '/all-rooms' ? 'text-yellow-500 after:scale-x-100' : `${isScrolled ? 'text-white' : 'text-white'} after:scale-x-0`} 
                            hover:after:scale-x-100 after:transition-transform after:duration-300`}
                        >
                            Rooms
                        </Link>
                        <Link
                            to="/contact"
                            className={`relative py-2 hover:text-yellow-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-yellow-500 
                            ${current === '/contact' ? 'text-yellow-500 after:scale-x-100' : `${isScrolled ? 'text-white' : 'text-white'} after:scale-x-0`} 
                            hover:after:scale-x-100 after:transition-transform after:duration-300`}
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Desktop & Mobile Auth Section */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <Dropdown menu={{ items: profileMenuItems }} placement="bottomRight">
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Avatar size={35} icon={<UserOutlined />} className="cursor-pointer bg-yellow-500" />
                                    </a>
                                </Dropdown>
                            </div>
                        ) : (
                            <Space>
                                <Button type="primary" className={`${isScrolled ? 'bg-blue-500' : 'bg-yellow-500'} hidden md:block border-0 hover:bg-yellow-600`}>
                                    <Link to="/login" className="text-white">Đăng nhập</Link>
                                </Button>
                                <Button type="primary" className={`${isScrolled ? 'bg-blue-500' : 'bg-yellow-500'} md:hidden border-0 hover:bg-yellow-600`}>
                                    <Link to="/login" className="text-white">Đăng nhập</Link>
                                </Button>
                            </Space>
                        )}
                        <MenuOutlined
                            className="text-xl md:hidden cursor-pointer text-white"
                            onClick={showDrawer}
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <Drawer
                title="Menu"
                placement="right"
                onClose={() => setIsDrawerOpen(false)}
                open={isDrawerOpen}
                className="bg-primary"
                styles={{
                    header: {
                        background: '#1a1a1a',
                        color: 'white'
                    },
                    body: {
                        background: '#1a1a1a',
                        padding: 0
                    }
                }}
            >
                <div className="flex flex-col space-y-4 p-4">
                    <Link
                        to="/"
                        className={`text-white hover:text-yellow-500 text-lg py-2 border-b border-gray-700 ${current === '/' ? 'text-yellow-500' : ''}`}
                        onClick={() => setIsDrawerOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/all-rooms"
                        className={`text-white hover:text-yellow-500 text-lg py-2 border-b border-gray-700 ${current === '/all-rooms' ? 'text-yellow-500' : ''}`}
                        onClick={() => setIsDrawerOpen(false)}
                    >
                        Rooms
                    </Link>
                    <Link
                        to="/contact"
                        className={`text-white hover:text-yellow-500 text-lg py-2 border-b border-gray-700 ${current === '/contact' ? 'text-yellow-500' : ''}`}
                        onClick={() => setIsDrawerOpen(false)}
                    >
                        Contact
                    </Link>
                </div>
            </Drawer>
        </nav>
    );
};

export default Navbar;