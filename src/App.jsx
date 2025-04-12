import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import LayoutClient from './components/client/layout.client';
import NotFound from './components/share/not.found';
import DashboardPage from './pages/admin/dashboard';
import RegisterPage from './pages/auth/register';
import LoginPage from './pages/auth/login';
import LayoutAdmin from './components/admin/layout.admin';
import { fetchAccount } from './redux/slice/accountSlide';
import LayoutApp from './components/share/layout.app';
import ProtectedAdminRoute from './components/share/protected-route';
import UserPage from './pages/admin/user';
import ProtectedUserRoute from './components/share/protected-route/user-protected';

import HomePage from './pages/client/_home';
import RoomPage from './pages/admin/room';
import AllRooms from './pages/client/_allrooms';
import Contact from './pages/client/_contact';
import Profile from './pages/client/_profile';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      window.location.pathname === '/login' ||
      window.location.pathname === '/register'
    )
      return;
    dispatch(fetchAccount());
  });

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <LayoutApp>
          <LayoutClient />
        </LayoutApp>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'all-rooms', element: <AllRooms /> },
        { path: 'contact', element: <Contact /> },
        {
          path: 'profile', element:
            <ProtectedUserRoute>
              <Profile />
            </ProtectedUserRoute>
        },
      ],
    },
    
    {
      path: '/admin',
      element: (
        <ProtectedAdminRoute>
          <LayoutApp>
            <LayoutAdmin />
          </LayoutApp>
        </ProtectedAdminRoute>
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          path: 'dashboard',
          element: <DashboardPage />,
        },
        {
          path: 'rooms',
          element: <RoomPage />,
        },
        {
          path: 'users',
          element: <UserPage />,
        },
      ],
    },

    {
      path: '/login',
      element: <LoginPage />,
    },

    {
      path: '/register',
      element: <RegisterPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
