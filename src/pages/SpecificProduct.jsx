import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {CartContext} from "../context/CartContext";
import {Card, Carousel, Col, Image, Row} from "react-bootstrap";
import {LoadingContext} from "../context/LoadingContext";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import Button from "react-bootstrap/Button";
import Toast from 'react-bootstrap/Toast';


const SpecificProduct = () => {
    const [product, setProduct] = useState();
    const {productName} = useParams();
    const cart = useContext(CartContext);
    const [showToast, setShowToast] = useState(false);
    const {setLoading} = useContext(LoadingContext);
    const [productDescription, setProductDescription] = useState('')

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
                        fetchProductDescription();
                    })
                    .catch((errorMessage) => {
                        throw new Error(errorMessage)
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            })
    }, [productName, setLoading]);

    const fetchProductDescription = () => {
        fetch('https://technologyproject.s3.eu-north-1.amazonaws.com/1699110762491_specs.txt')
            .then((response) => response.text())
            .then((data) => {
                setProductDescription(data);
            })
            .catch((error) => {
                console.error('Error fetching product description:', error);
            });
    }

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
        return <Skeleton count={5}/>;
    }

    return (
        <Row style={{ marginTop: '20px' }}>
            <Col md={6}>
                <Carousel>
                    <Carousel.Item>
                        <Image src={product.primaryImageUrl} alt={`Product Primary Image`}
                               className="d-block w-100"/>
                    </Carousel.Item>
                    {product.imageUrls.map((image, index) => (
                        <Carousel.Item key={index}>
                            <Image src={image} alt={`Product Image ${index}`}
                                   className="d-block w-100"/>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Col>
            <Col md={6}>
                    <h2>{product.productName}</h2>
                    <p>{product.price}</p>
                    <Button variant="dark" onClick={() => addToCart()}>
                        Add to cart
                    </Button>
                    <h3>Product Description</h3>
                    <div><p>{productDescription}</p></div>
                    <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="mr-auto">Notification</strong>
                        </Toast.Header>
                        <Toast.Body>
                            The product has been added to the cart!
                        </Toast.Body>
                    </Toast>
            </Col>
        </Row>
    );
};

export default SpecificProduct;
