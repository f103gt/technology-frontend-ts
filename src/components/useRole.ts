import React, {ReactNode, useContext} from "react";
import {RoleContext} from "./RoleContext";

//Hook to use role context
export function useRole(){
    const roleContext = useContext(RoleContext);
    if(!roleContext){
        throw new Error("useRole function must be used within a RoleProvider");
    }
    return roleContext;
}