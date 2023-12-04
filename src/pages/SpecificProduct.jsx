import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {CartContext} from "../context/CartContext";
import {Card, Carousel, Col, Container, Image, Row} from "react-bootstrap";
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

    useEffect(() => {
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
                        fetchProductDescription(result.data);
                        console.log(productDescription);
                    })
                    .catch((errorMessage) => {
                        throw new Error(errorMessage)
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            })
    }, [productName, setLoading]);

    const fetchProductDescription = (productData) => {
        if (productData !== undefined) {
            fetch(productData.descriptionUrl)
                .then((response) => response.text())
                .then((data) => {
                    setProductDescription(data);
                })
                .catch((error) => {
                    console.error('Error fetching product description:', error);
                });
        }
    }


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

    if (product && productDescription !== undefined) {
        const descriptionParts = productDescription.split('\n');
        const firstHalf = descriptionParts.slice(0, descriptionParts.length / 2).join('\n');
        const secondHalf = descriptionParts.slice(descriptionParts.length / 2).join('\n');
        return (
            <Container style={{marginTop: '40px'}}>
                <Card>
                    <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="mr-auto">Cart Update</strong>
                        </Toast.Header>
                        <Toast.Body>Product added to cart!</Toast.Body>
                    </Toast>
                    <Row>
                        <Col md={6}>
                            <Carousel>
                                <Carousel.Item>
                                    <Image src={product.primaryImageUrl} alt={`Product Primary Image`}
                                           className="d-block w-100"
                                           style={{height: '500px', objectFit: 'cover'}}/>
                                </Carousel.Item>
                                {product.imageUrls.map((image, index) => (
                                    <Carousel.Item key={index}>
                                        <Image src={image} alt={`Product Image ${index}`}
                                               className="d-block w-100"
                                               style={{height: '500px', objectFit: 'cover'}}/>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                            <h3 style={{color: '#28a745', fontWeight: 'bold'}}>{product.price}$$</h3>
                            <Button variant="success" onClick={() => addToCart()}>
                                Add to cart
                            </Button>
                        </Col>
                        <Col md={6}>
                            <h4 style={{color: '#17a2b8', fontWeight: 'bold'}}>Product Description</h4>
                            <Row>
                                <Col md={6} style={{margin: '10px'}}>
                                    <div style={{maxWidth: '100%', overflow: 'auto', whiteSpace: 'pre-wrap'}}>
                                        <p style={{color: '#6c757d', fontSize: '14px'}}>{firstHalf}</p>
                                    </div>
                                </Col>
                                <Col md={5} style={{margin: '10px'}}>
                                    <div style={{maxWidth: '100%', overflow: 'auto', whiteSpace: 'pre-wrap'}}>
                                        <p style={{color: '#6c757d', fontSize: '14px'}}>{secondHalf}</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row></Card>
            </Container>

        );
    } else {
        return <Skeleton count={5}/>;
    }

};

export default SpecificProduct;
