import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import NavBar from '../components/nav-bar.component';
import { styled } from '@mui/material/styles';

const ContentDiv = styled('div')(({ theme }) => ({
  height: `calc(100% - ${theme.spacing(6)})`,
  marginTop: theme.spacing(6),
  overflowY: 'auto'
}));

const RootRoute = () => {
  // Set the app title
  document.title = process.env.REACT_APP_TITLE || 'BAHubba Book Club Manager';

  // React router location and navigation
  const location = useLocation();
  const navigate = useNavigate();

  // If the current route is the root route, redirect to the home route
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/home');
    }
  }, [location.pathname, navigate]);

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
