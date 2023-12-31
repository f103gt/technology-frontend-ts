import {useCallback, useContext, useEffect} from "react";
import {communicateWithServer} from "./ServerCommunication";
import {CartContext} from "../context/CartContext";
import {RoleContext} from "../context/RoleProvider";

export const useCartServerSynchronization = () => {
    const {items, resetAll} = useContext(CartContext);
    const {userRole} = useContext(RoleContext);
    const synchronizeCartWithServer = useCallback(async () => {
        try {
            if (items.length > 0 && userRole === "user") {
                const productQuantityMap = {};
                items.forEach((cartItem) => {
                    let {productName, cartItemQuantity} = cartItem;
                    productQuantityMap[productName] = (productQuantityMap[productName] || 0) + cartItemQuantity;
                });
                const response = await communicateWithServer({
                    method: 'post',
                    url: "/cart/api/v1/add-all-cart-items",
                    data: productQuantityMap,
                    handleError: console.log,
                });
                resetCartItems(response);
            } else if (items.length === 0 && userRole === "user") {
                const response = await communicateWithServer({
                    method: 'get',
                    url: "/cart/api/v1/get-user-cart",
                    handleError: console.log
                });
                resetCartItems(response);
            }
            localStorage.removeItem('successResponse');
        } catch (error) {
            console.error("Synchronization error:", error);
        }
    }, [items]);

    const resetCartItems = (response) => {
        localStorage.removeItem('cartItems');
        resetAll(response.data);
    }

    useEffect(() => {
        const successResponse = localStorage.getItem('successResponse') === 'true';

        if (successResponse) {
            synchronizeCartWithServer();
        }
    }, [synchronizeCartWithServer]);

    return {
        synchronizeCartWithServer: () => {
            localStorage.setItem('successResponse', 'true');
        },
        clearSuccessResponse: () => {
            localStorage.removeItem('successResponse');
        },
    };
}