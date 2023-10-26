import { useContext } from 'react';
import {RoleContext} from "../context/RoleProvider";

export const RoleBasedComponent = ({ roles, children }) => {
    const { userRole } = useContext(RoleContext);

   /* console.log("userRole:", userRole);

    console.log(localStorage.getItem("userRole"));*/

    if (roles.includes(userRole)) {
        return children;
    }

    return null;
};

