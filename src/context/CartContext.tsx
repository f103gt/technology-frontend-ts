import React, {createContext, ReactNode, useContext, useEffect, useReducer, useState} from 'react';
import {RoleContext} from "./RoleProvider";
import {addNewItemServer, deleteCartItemServer} from "./CartServerActions";

const ACTIONS = {
    ADD_NEW: "add_new",
    ADD_ANOTHER: "add_another",
    REMOVE_ONE: "remove_one",
    DELETE_ALL: "delete_all",
    RESET_ALL: "reset_all"
}

export interface CartItem {
    categoryName: string;
    productName: string;
    productImage: string;
    productQuantity: number;
    cartItemQuantity: number;
    cartItemPrice: number;
}

function reducer(state: CartItem[], action: {
    type: string,
    payload: any
}) {
    switch (action.type) {
        case ACTIONS.ADD_NEW:
            return addNewOneToCart(state, action.payload);
        case ACTIONS.ADD_ANOTHER:
            return addOneToCart(state, action.payload);
        case ACTIONS.REMOVE_ONE:
            return removeOneFromCart(state, action.payload);
        case ACTIONS.DELETE_ALL:
            return deleteFromCart(state, action.payload);
        case ACTIONS.RESET_ALL:
            return action.payload.items;
        default:
            return state;
    }
}


export const CartContext = createContext({
    items: [] as CartItem[],
    getProductQuantity: (productName: string) => Number(0),
    addNewOneToCart: (product: any) => {
    },
    addOneToCart: (productName: string) => {
    },
    removeOneFromCart: (productName: string) => {
    },
    deleteFromCart: (productName: string) => {
    },
    getTotalCost: () => Number(0),
});

function resetAll(dispatch: React.Dispatch<any>, newItems: CartItem[]) {
    dispatch({type: ACTIONS.RESET_ALL, payload: {items: newItems}});
}

function getProductQuantity(state: CartItem[], productName: string) {
    const quantity = state
        .find((cartItem) => cartItem.productName === productName)
        ?.cartItemQuantity;
    return quantity ?? 0;
}

function addNewOneToCart(state: CartItem[], product: any) {
    const newCartItem: CartItem = {
        productName: product.productName,
        categoryName: product.categoryName,
        productImage: product.primaryImageUrl,
        productQuantity: product.quantity,
        cartItemQuantity: 1,
        cartItemPrice: Number(product.price),
    };
    return [...state, newCartItem];
}


function addOneToCart(state: CartItem[], productName: string) {
    const quantity = getProductQuantity(state, productName);
    const updatedQuantity = quantity + 1;
    return (state.map((item) =>
            item.productName === productName
                ? {
                    ...item,
                    cartItemQuantity: updatedQuantity,
                    cartItemPrice:
                        (item.cartItemPrice / quantity) * updatedQuantity,
                }
                : item
        )
    );
}

function removeOneFromCart(state: CartItem[], productName: string) {
    const quantity = getProductQuantity(state, productName);

    if (quantity === 1) {
        return deleteFromCart(state, productName);
    } else {
        const updatedQuantity = quantity - 1;
        return (state.map((item) =>
                item.productName === productName
                    ? {
                        ...item,
                        cartItemQuantity: updatedQuantity,
                        cartItemPrice:
                            (item.cartItemPrice / quantity) * updatedQuantity,
                    }
                    : item
            )
        );
    }
}


//TODO delete everything from cart
function deleteFromCart(state: CartItem[], productName: string) {
    return (
        state.filter((item) => item.productName !== productName)
    );
}

export const CartProvider = ({children}: { children: ReactNode }) => {
    const [cartItems, dispatch]
        = useReducer<React.Reducer<CartItem[], {
        type: string,
        payload: any
    }>>(reducer, getInitialCartItems());
    const {userRole} = useContext(RoleContext);
    const [prevCartItems, setPrevCartItems] = useState(cartItems);

    function getInitialCartItems() {
        const storedCartItems = localStorage.getItem("cartItems");
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    }

    const resetItems = (newItems: CartItem[]) => {
        localStorage.setItem("cartItems", JSON.stringify(newItems));
        setPrevCartItems(newItems);
        resetAll(dispatch, newItems);
    };

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        setPrevCartItems(cartItems);
    }, [cartItems]);

    useEffect(() => {
        function findAddedItem(item: CartItem) {
            const prevItem = prevCartItems.find((prevItem) => prevItem.productName === item.productName);
            return !prevItem || (prevItem && item.cartItemQuantity > prevItem.cartItemQuantity);
        }

        function findRemovedItem(prevItem: CartItem) {
            const item = cartItems.find((item) => item.productName === prevItem.productName);
            return !item || (item && prevItem.cartItemQuantity > item.cartItemQuantity);
        }

        const newItemAdded = cartItems.some((item) => {
            return findAddedItem(item);
        });

        const itemRemoved = prevCartItems.some((item) => {
            return findRemovedItem(item);
        });

        if (newItemAdded && userRole !== "guest") {
            const addedItem = cartItems.find((item) => {
                return findAddedItem(item);
            });
            if (addedItem) {
                addNewItemServer(addedItem.productName);
            }
        } else if (itemRemoved && userRole !== "guest") {
            const deletedItem = prevCartItems.find((item) => {
                return findRemovedItem(item);
            });
            if (deletedItem) {
                deleteCartItemServer(deletedItem.productName);
            }
        }

    }, [prevCartItems, cartItems, userRole]);


    function getTotalCost(cartItems: CartItem[]) {
        return cartItems.reduce(
            (total, cartItem) => total + cartItem.cartItemPrice,
            0
        );
    }

    const contextValue = {
        items: cartItems,
        getProductQuantity: (productName: string) => getProductQuantity(cartItems, productName),
        addNewOneToCart: (product: any) => dispatch({type: ACTIONS.ADD_NEW, payload: product}),
        addOneToCart: (productName: string) => dispatch({type: ACTIONS.ADD_ANOTHER, payload: productName}),
        removeOneFromCart: (productName: string) => dispatch({type: ACTIONS.REMOVE_ONE, payload: productName}),
        deleteFromCart: (productName: string) => dispatch({type: ACTIONS.DELETE_ALL, payload: productName}),
        getTotalCost: () => getTotalCost(cartItems),
        resetAll: resetItems,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;