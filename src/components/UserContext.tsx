import React from "react";

export interface User {
    username: string;
    role: string;
}

export interface UserContextType {
    user: User | null,
    login: (userData: User) => void;
    logout: () => void;
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export default UserContext;