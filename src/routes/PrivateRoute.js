import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({component: Component, roles, ...rest}) => {
    const userRole = Cookies.get("role");
    const location = useLocation();

    if(!userRole){
        return<Navigate to={"/login"} state={{from: location}} replace/>;
    }
    if(!roles.isIncluded(userRole)){
        return <Navigate to={"/home"} state={{from:location}} replace/>;
    }
    return <Component {...rest}/>
};

export default PrivateRoute;
