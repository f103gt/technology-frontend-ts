import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import {CartContext} from "../context/CartContext";

interface ProductDetails {
    categoryName: string;
    productName: string;
    productSku: string,
    productQuantity: number,
    productPrice: number,
    /*productImages: File[],
    productInfoFile: File;*/
}

interface CartItem {
    categoryName: string;
    productName: string;
    /*productImage: File;*/
    cartItemQuantity: number;
    cartItemPrice: number;
}

const SpecificProduct = () => {
    const [product, setProduct] = useState<ProductDetails>();
    const {categoryName} = useParams<string>();
    const {productName} = useParams<string>();
    const cart = useContext(CartContext);

    const fetchProductData = useCallback(() => {
        axios.get("/csrf/api/v1")
            .then(response => {
                const csrfToken = response.data.headers;
                axios.get(`/api/v1/specific-product?categoryName=${categoryName}&productName=${productName}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    }
                })
                    .then(result => {
                        setProduct(result.data);
                        console.log(result.data.productName);
                    });
            })
    }, [categoryName, productName, setProduct]);

    useEffect(() => {
        fetchProductData();
    }, [fetchProductData]);
    return (
        <div>
            <Button variant="primary" onClick={() => {
                if (product !== undefined) {
                    const cartItem: CartItem = {
                        productName: product?.productName,
                        categoryName: product?.categoryName,
                        /*productImage: product?.productImages[0],*/
                        cartItemPrice: product?.productPrice,
                        cartItemQuantity: 0
                    };
                    cart.addOneToCart(cartItem);
                }
            }}>Cart</Button>
        </div>
    );
};

export default SpecificProduct;