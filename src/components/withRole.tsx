import React, { useContext } from 'react';
import { RoleContext } from './RoleContext';

export const withRole = (Component:any, allowedRoles:string[]) => {
    return (props:any) => {
        const role = useContext(RoleContext);
        if (role && allowedRoles.includes(role)) {
            return <Component {...props} />;
        } else {
            return null; // or handle unauthorized access as needed
        }
    };
};
