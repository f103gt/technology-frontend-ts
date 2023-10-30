import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import {CartContext} from "../context/CartContext";
import {Toast} from "react-bootstrap";
import {LoadingContext} from "../context/LoadingContext";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';


export interface ProductDetails {
    categoryName: string;
    productName: string;
    productSku: string,
    productQuantity: number,
    productPrice: number,
    /*productImages: File[],
    productInfoFile: File;*/
}

const SpecificProduct = () => {
    const [product, setProduct] = useState<ProductDetails>();
    const {productName} = useParams<string>();
    const cart = useContext(CartContext);
    const [showToast, setShowToast] = useState(false);
    const { setLoading } = useContext(LoadingContext);

    const fetchProductData = useCallback(() => {
        setLoading(true);
        axios.get("/csrf/api/v1")
            .then(response => {
                const csrfToken = response.data.headers;
                axios.get(`/api/v1/specific-product?productName=${productName}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    }
                })
                    .then(result => {
                        setProduct(result.data);
                    })
                    .catch((errorMessage)=>{
                        throw new Error(errorMessage)
                    })
                    .finally(()=>{
                        setLoading(false);
                    });
            })
    }, [productName]);

    useEffect(() => {
        fetchProductData();
    }, [fetchProductData]);

    const addToCart = () => {
        if (!product) {
            throw new Error("product not found");
        }
        const existingCartItem =
            cart.items.find(cartItem => cartItem.productName === product.productName);
        if (!existingCartItem) {
            cart.addNewOneToCart(product);
        } else {
            cart.addOneToCart(product.productName);
        }
        setShowToast(true);
    };

    if (!product) {
        return <Skeleton count={5} />; // Adjust this as needed
    }

    return (
        <div>
            <span>{product?.productName}</span>
            <Button variant="primary" onClick={() => addToCart()}>
                Add to cart</Button>
            <Toast onClose={() => setShowToast(false)}
                   show={showToast} delay={3000} autohide>
                <Toast.Header>
                    <strong className="mr-auto"></strong>
                    <Toast.Body>
                        The product has been added to the cart!
                    </Toast.Body>
                </Toast.Header>
            </Toast>
        </div>
    );
};

export default SpecificProduct;
