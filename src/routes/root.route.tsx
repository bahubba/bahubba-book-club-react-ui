import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import NavBar from '../components/nav-bar.component';
import { styled } from '@mui/material/styles';

const ContentDiv = styled('div')(({ theme }) => ({
  height: `calc(100% - ${theme.spacing(6)})`,
  marginTop: theme.spacing(6),
  padding: theme.spacing(1),
  overflowY: 'hidden',
  display: 'flex',
  flexDirection: 'column'
}));

/**
 * Parent route for all other routes, navigates to the home route by default
 */
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
      <ToastContainer />
    </>
  );
};

export default RootRoute;
