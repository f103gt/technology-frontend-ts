import React, {createContext, ReactNode, useContext, useEffect, useReducer, useState} from 'react';
import {ProductDetails} from '../pages/SpecificProduct';
import {RoleContext} from "./RoleProvider";
import {addNewItemServer, deleteCartItemServer} from "./CartServerActions";

const ACTIONS = {
    ADD_NEW: "add_new",
    ADD_ANOTHER: "add_another",
    REMOVE_ONE: "remove_one",
    DELETE_ALL: "delete_all"
}

export interface CartItem {
    categoryName: string;
    productName: string;
    /*productImage: File;*/

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
        default:
            return state;
    }
}


export const CartContext = createContext({
    items: [] as CartItem[],
    getProductQuantity: (productName: string) => Number(0),
    addNewOneToCart: (product: ProductDetails) => {
    },
    addOneToCart: (productName: string) => {
    },
    removeOneFromCart: (productName: string) => {
    },
    deleteFromCart: (productName: string) => {
    },
    getTotalCost: () => Number(0),
});

function getProductQuantity(state: CartItem[], productName: string) {
    const quantity = state
        .find((cartItem) => cartItem.productName === productName)
        ?.cartItemQuantity;
    return quantity ?? 0;
}

function addNewOneToCart(state: CartItem[], product: ProductDetails) {
    const newCartItem: CartItem = {
        productName: product.productName,
        categoryName: product.categoryName,
        cartItemQuantity: 1,
        cartItemPrice: Number(product.productPrice),
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

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        setPrevCartItems(cartItems);
    }, [cartItems]);

    useEffect(() => {
        const newItemAdded = cartItems.some((item) => {
            const prevItem = prevCartItems.find((prevItem) => prevItem.productName === item.productName);
            return !prevItem || (prevItem && item.cartItemQuantity > prevItem.cartItemQuantity);
        });
        console.log(newItemAdded);
        const itemRemoved = cartItems.some((item) => {
            const prevItem = prevCartItems.find((prevItem) => prevItem.productName === item.productName);
            return prevItem && item.cartItemQuantity < prevItem.cartItemQuantity;
        });
        if (newItemAdded && userRole !== "guest") {
            const addedItem = cartItems.find((item) => {
                const prevItem = prevCartItems.find((prevItem) => prevItem.productName === item.productName);
                return !prevItem || (prevItem && item.cartItemQuantity > prevItem.cartItemQuantity);
            });
            console.log(addedItem);
            if (addedItem) {
                addNewItemServer(addedItem.productName);
            }

        } else if (itemRemoved && userRole !== "guest") {
            const deletedItem = prevCartItems.find((prevItem) =>
                !cartItems.some((item) => item.productName === prevItem.productName));
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
        addNewOneToCart: (product: ProductDetails) => dispatch({type: ACTIONS.ADD_NEW, payload: product}),
        addOneToCart: (productName: string) => dispatch({type: ACTIONS.ADD_ANOTHER, payload: productName}),
        removeOneFromCart: (productName: string) => dispatch({type: ACTIONS.REMOVE_ONE, payload: productName}),
        deleteFromCart: (productName: string) => dispatch({type: ACTIONS.DELETE_ALL, payload: productName}),
        getTotalCost: () => getTotalCost(cartItems)
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
