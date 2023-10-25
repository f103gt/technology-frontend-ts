import React, { createContext, useEffect, useState } from "react";

// Create a context for user role
export const RoleContext = createContext("guest");

// Provide a component that wraps the app
const RoleProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(() => {
        // Get the role from local storage
        const savedRole = localStorage.getItem("userRole");
        // If the role does not exist, the user is a guest
        return savedRole || "guest";
    });

    // Save the role to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("userRole", userRole);
    }, [userRole]);

    return (
        <RoleContext.Provider value={{ userRole, setUserRole }}>
            {children}
        </RoleContext.Provider>
    );
};

export default RoleProvider;
