import React from "react";
import {useLocalState} from "../utils/useLocalState";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children}) => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    return jwt ? children : <Navigate to="/authenticate"/>;
};

export default PrivateRoute;
