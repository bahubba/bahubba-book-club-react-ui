import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/slices/auth/auth.slice';

// Component props
interface Props {
  protectedRoute: ReactElement;
}

/**
 * Wrapper to protect routes that require authentication
 * @prop {ReactElement} protectedRoute - The route to protect
 */
const RequireAuthRoute = ({ protectedRoute }: Props) => {
  const location = useLocation();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? (
    protectedRoute
  ) : (
    <Navigate
      to="/login"
      state={{ from: location }}
      replace
    />
  );
};

export default RequireAuthRoute;
