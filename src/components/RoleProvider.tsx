import {createContext, ReactNode, useEffect, useState} from "react";
import React from 'react';

interface RoleContextType{
    role: string;
    setRole: React.Dispatch<React.SetStateAction<string>>
}

//create a context for user role
export const RoleContext = createContext<RoleContextType | undefined>(undefined);


interface RoleProviderProps {
    children: ReactNode;
}

//provide component that wraps the app
const RoleProvider: React.FC<RoleProviderProps> = ({children}) => {
    const [role, setRole] = useState(() => {
        //get role from local storage
        const savedRole = window.localStorage.getItem("userRole");
        //if role does not exit, user is a guest
        return savedRole || "guest";
    });

    //save the role to local storage whenever it changes
    useEffect(() => {
        window.localStorage.setItem("userRole", role);
    }, [role]);
    return (
        <div>
            <RoleContext.Provider value={{role, setRole}}>
                {children}
            </RoleContext.Provider>
        </div>
    );
};

export default RoleProvider;