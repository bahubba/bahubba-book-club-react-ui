import {ReactElement} from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/slices/auth/auth.slice";

interface Props {
    protectedRoute: ReactElement
}

const RequireAuthRoute = ({ protectedRoute }: Props) => {
    const location = useLocation();

    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        isLoggedIn ? protectedRoute : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuthRoute;