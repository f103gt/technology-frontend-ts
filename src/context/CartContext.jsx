import React, {createContext, useState} from 'react';

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {
    },
    addOneToCart: (product) => {
    },
    removeOneFromCart: (productName) => {
    },
    deleteFromCart: (productName) => {
    },
    getTotalCost: (productName) => {
    },

});
export const CartProvider = ({children}) => {
    const [cartProducts, setCartProducts] = useState([]);
    //TODO if role !== guest and if a cart item was added or deleted persist the user cart into database

    function getProductQuantity(productName) {
        const quantity = cartProducts.find(product => product.productName === productName)?.quantity;
        if (quantity === undefined) {
            return 0;
        }
        return quantity;
    }

    function addOneToCart(product) {
        const productName = product.productName;
        const quantity = getProductQuantity(productName);
        if (quantity === 0) {
            setCartProducts([...cartProducts,
                {...product, quantity: 1}])
            return;
        }
        const updatedQuantity = quantity + 1;
        setCartProducts(
            cartProducts.map(
                product => product.productName === productName
                    ? {
                        ...product, quantity: updatedQuantity,
                        price: (product.price/quantity) * updatedQuantity
                    }
                    : product
            )
        )

    }

    function removeOneFromCart(productName) {
        const quantity = getProductQuantity(productName);
        if (quantity === 1) {
            deleteFromCart(productName);
            return;
        }
        const updatedQuantity = quantity -1;
        setCartProducts(
            cartProducts.map(
                product => product.productName === productName
                    ? {
                        ...product, quantity: updatedQuantity,
                        price: (product.price/quantity) * updatedQuantity
                    }
                    : product
            ))
    }

    function deleteFromCart(productName) {
        setCartProducts(cartProducts =>
            cartProducts.filter(product => {
                return product.productName !== productName;
            })
        )
    }

    function getTotalCost() {
        let totalCost = 0;
        cartProducts.map(product =>
            totalCost += product.price)
        return totalCost;
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost
    };
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;