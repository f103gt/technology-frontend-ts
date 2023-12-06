import React, {useContext} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {RoleContext} from "../context/RoleProvider";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    const {userRole} = useContext(RoleContext);
    const location = useLocation();

    if (!userRole) {
        return <Navigate to={"/login"} state={{ from: location }} replace />;
    }
    if (!roles.includes(userRole)) {
        return <Navigate to={"/home"} state={{ from: location }} replace />;
    }
    return <Component {...rest} />;
};

export default PrivateRoute;
