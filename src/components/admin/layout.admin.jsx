import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Dropdown,
  message,
  Space,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { callLogout } from '../../config/api.auth';
import { setLogoutAction } from '../../redux/slice/accountSlide';
import { ProLayout } from '@ant-design/pro-components';

const LayoutAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.account.user);

  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('');
  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);


  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res && +res.statusCode === 200) {
      dispatch(setLogoutAction({}));
      message.success('Đăng xuất thành công');
      navigate('/');
    }
  };

  const items = [
    {
      key: 'home',
      label: <Link to='/'>Trang chủ</Link>,
    },
    {
      key: 'profile',
      label: <Link to='/profile'>Trang cá nhân</Link>,
    },
    {
      key: 'logout',
      danger: true,
      label: <label onClick={handleLogout}>Đăng xuất</label>,
    },
  ];

  const menuSidebar = [
    {
      path: '/admin/dashboard',
      icon: <AppstoreOutlined />,
      name: <Link to='/admin/dashboard'>Dashboard</Link>,
      roles: ['ADMIN', 'RECEPTIONIST'],
    },
    {
      path: '/admin/users',
      icon: <UserOutlined />,
      name: <Link to='/admin/users'>User</Link>,
      roles: ['ADMIN']
    },
    {
      path: '/admin/rooms',
      icon: <VideoCameraOutlined />,
      name: <Link to='/admin/rooms'>Room</Link>,
      roles: ['ADMIN', 'RECEPTIONIST', 'CASHIER']
    },
  ];

  const filterMenuByRole = (menuItems, userRole) => {
    return menuItems
      .filter(item => item.roles.includes(userRole))
      .map(item => {
        if (item.children) {
          const filteredChildren = filterMenuByRole(item.children, userRole);
          return { ...item, children: filteredChildren };
        }
        return item;
      });
  };

  const filteredMenuSidebar = filterMenuByRole(menuSidebar, user.roleName);


  return (
    <>

      <ProLayout
        fixSiderbar
        fixedHeader
        defaultCollapsed
        pageTitleRender={false}
        
        actionsRender={() => [
          <>
            <Dropdown
              menu={{
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar shape='square' icon={<UserOutlined />} />
                </Space>
              </a>
            </Dropdown>
          </>
        ]}
        menuDataRender={() => filteredMenuSidebar}
        layout="mix"
        location={{
          pathname: activeMenu,
        }}
      >
        <Outlet />
      </ProLayout>

    </>
  );
};

export default LayoutAdmin;
