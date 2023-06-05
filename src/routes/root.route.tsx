import React from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from '../components/nav-bar.component';
import { styled } from '@mui/material/styles';

const ContentDiv = styled('div')(({ theme }) => ({
  height: `calc(100% - ${theme.spacing(6)})`,
  marginTop: theme.spacing(6),
  overflowY: 'auto'
}));

const RootRoute = () => {
  return (
    <>
      <NavBar />
      <ContentDiv>
        <Outlet />
      </ContentDiv>
    </>
  );
};

export default RootRoute;
