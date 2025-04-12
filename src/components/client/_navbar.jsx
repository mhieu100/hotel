import { MenuOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Drawer, Dropdown, Menu, message, Space } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { callLogout } from '../../config/api.auth'
import { setLogoutAction } from '../../redux/slice/accountSlide'

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState('/');
  const location = useLocation();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);

  const handleLogout = async () => {
    try {
      const res = await callLogout();
      if (res?.statusCode === 200) {
        dispatch(setLogoutAction());
        message.success('Đăng xuất thành công');
        navigate('/');
      } else {
        message.error('Đăng xuất thất bại');
      }
    } catch (error) {
      console.error('Logout error:', error);
      message.error('Đăng xuất thất bại. Vui lòng thử lại');
    }
  };

  const items = [
    {
      label: `Welcome ${user?.fullname}`,
    },
    user.roleName !== 'PATIENT'
      ? {
        key: 'system',
        label: <Link to='/admin/dashboard'>Trang quản trị</Link>,
      }
      : null,
    {
      key: 'profile',
      label: <Link to='/profile'>Hồ sơ</Link>,
    },
    {
      key: 'logout',
      danger: true,
      label: <label onClick={handleLogout} className="cursor-pointer">Đăng xuất</label>,
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 bg-primary shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <i className="fas fa-hotel text-2xl text-gold" />
          <span className="text-2xl font-bold text-white">
            Furama Hotel
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 items-center justify-center flex-1">
          <li>
            <Link
              to="/"
              className={`relative py-1 text-white hover:text-yellow-500 transition-colors duration-300 ${current === '/' ? 'text-yellow-500' : ''
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-yellow-500 
              ${current === '/' ? 'after:scale-x-100' : 'after:scale-x-0'} 
              hover:after:scale-x-100 after:transition-transform after:duration-300`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/all-rooms"
              className={`relative py-1 text-white hover:text-yellow-500 transition-colors duration-300 ${current === '/all-rooms' ? 'text-yellow-500' : ''
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-yellow-500 
              ${current === '/all-rooms' ? 'after:scale-x-100' : 'after:scale-x-0'} 
              hover:after:scale-x-100 after:transition-transform after:duration-300`}
            >
              Room
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`relative py-1 text-white hover:text-yellow-500 transition-colors duration-300 ${current === '/contact' ? 'text-yellow-500' : ''
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-yellow-500 
              ${current === '/contact' ? 'after:scale-x-100' : 'after:scale-x-0'} 
              hover:after:scale-x-100 after:transition-transform after:duration-300`}
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Profile/Auth Section */}
        {isAuthenticated ? (
          <div className="flex items-center space-x-6">
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar size={35} icon={<UserOutlined />} />
                </Space>
              </a>
            </Dropdown>

            <MenuOutlined
              className="text-xl cursor-pointer md:hidden hover:text-blue-500 transition-colors"
              onClick={showDrawer}
            />
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Button type="primary" className="bg-blue-500 hover:bg-blue-600">
              <Link to="/login" className="text-white">Đăng nhập</Link>
            </Button>
            <MenuOutlined
              className="text-xl cursor-pointer md:hidden hover:text-blue-500 transition-colors"
              onClick={showDrawer}
            />
          </div>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
        width={250}
      >
        <ul className="flex flex-col space-y-4">
          <li onClick={closeDrawer}>
            <Link
              to="/"
              className={`block py-2 text-white hover:text-yellow-500 transition-colors ${current === '/' ? 'text-yellow-500' : ''
                }`}
            >
              Home
            </Link>
          </li>
          <li onClick={closeDrawer}>
            <Link
              to="/shop"
              className={`block py-2 text-white hover:text-yellow-500 transition-colors ${current === '/shop' ? 'text-yellow-500' : ''
                }`}
            >
              Shop
            </Link>
          </li>
          <li onClick={closeDrawer}>
            <Link
              to="/blog"
              className={`block py-2 text-white hover:text-yellow-500 transition-colors ${current === '/blog' ? 'text-yellow-500' : ''
                }`}
            >
              Blog
            </Link>
          </li>
        </ul>
      </Drawer>
    </div>
  )
}

export default Navbar