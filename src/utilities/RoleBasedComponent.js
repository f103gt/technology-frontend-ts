import { useContext } from 'react';
import {RoleContext} from "../context/RoleProvider";

export const RoleBasedComponent = ({ roles, children }) => {
    const { userRole } = useContext(RoleContext);

    if (roles.includes(userRole)) {
        return children;
    }

    return null;
};

