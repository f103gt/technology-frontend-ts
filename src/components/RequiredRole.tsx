import React, {ReactNode} from 'react';
import {useRole} from "./useRole";

interface RequiredRoleProps{
    requiredRole: string;
    children: ReactNode;
}


//Component that requires a certain role to render
const RequiredRole: React.FC<RequiredRoleProps> = ({requiredRole, children}) => {
    const role = useRole();
    if(role !== requiredRole){
        return null;
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default RequiredRole;