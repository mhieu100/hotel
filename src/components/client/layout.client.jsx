import { Outlet } from 'react-router-dom';

import Loading from '../share/loading';
import { useEffect, useState } from 'react';
import Navbar from './_navbar';
import Footer from './_footer';

const LayoutClient = () => {


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>

  );
};

export default LayoutClient;
