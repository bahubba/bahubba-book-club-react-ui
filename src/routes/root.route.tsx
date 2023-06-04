import React from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from '../components/nav-bar.component';

const RootRoute = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default RootRoute;
