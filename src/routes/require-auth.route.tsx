import {ReactElement} from "react";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import {selectCurrentUsername} from "../redux/slices/auth/auth.slice";

interface Props {
    protectedRoute: ReactElement
}

const RequireAuthRoute = ({ protectedRoute }: Props) => {
    const location = useLocation();

    const currentUser = useSelector(selectCurrentUsername);

    return (
        currentUser ? protectedRoute : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuthRoute;