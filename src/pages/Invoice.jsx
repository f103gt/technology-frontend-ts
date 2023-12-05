import React, {useCallback, useEffect, useState} from 'react';
import {Image, ListGroup} from "react-bootstrap";
import axios from "axios";
import {useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Skeleton from "react-loading-skeleton";

const Invoice = () => {
    const {uuid} = useParams();
    const [orderDetails, setOrderDetails] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrderData = useCallback(() => {
        axios.get('/csrf/api/v1')
            .then(csrfResponse => {
                const csrfToken = csrfResponse.data.headers;
                axios.get(`/staff/order-details?uuid=${uuid}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    }
                })
                    .then(response => {
                        setOrderDetails(response.data);
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching categories:', error);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            })
            .catch(error => {
                console.error('Error fetching CSRF token:', error);
            });
    }, [setOrderDetails, uuid]);

    useEffect(() => {
        fetchOrderData();
    }, [fetchOrderData]);
    if (!orderDetails) {
        return <Skeleton count={5}/>;
    }

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center">
                <div className="card" style={{width: '95vw',height:'97vh'}}>
                    <div className="card-body">
                        <div className="container mb-5 mt-3">
                            <div className="row d-flex align-items-baseline">
                                <div className="col-xl-9">
                                    <p style={{color: '#7e8d9f', fontSize: '20px'}}>
                                        <strong>Invoice</strong>
                                    </p>
                                </div>
                                <hr/>
                            </div>
                            <div className="container">
                                <div className="col-md-12">
                                </div>
                                <div className="row">
                                    <div className="col-xl-8">
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="text-muted">To:
                                                <span style={{color: '#5d9fc5'}}>{orderDetails.firstName}
                                                    {orderDetails.lastName}</span></ListGroup.Item>
                                            <ListGroup.Item className="text-muted">Delivery Address:
                                                <span style={{color: '#5d9fc5'}}>{orderDetails.deliveryAddress}</span>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="text-muted">Phone Number:
                                                <span style={{color: '#5d9fc5'}}>{orderDetails.phoneNumber}</span>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="text-muted">Email:
                                                <span style={{color: '#5d9fc5'}}>{orderDetails.email}</span>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </div>
                                    <div className="col-xl-4">
                                        <p className="text-muted">Details</p>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="text-muted">
                                                <i className="fas fa-circle" style={{color: '#84B0CA'}}></i>
                                                <span
                                                    className="fw-bold">Order ID:</span> #{orderDetails.uniqueIdentifier}
                                            </ListGroup.Item>
                                            <ListGroup.Item className="text-muted">
                                                <i className="fas fa-circle" style={{color: '#84B0CA'}}></i>
                                                <span className="fw-bold">Creation Date:</span>{orderDetails.orderDate}
                                            </ListGroup.Item>
                                            <ListGroup.Item className="text-muted">
                                                <i className="fas fa-circle" style={{color: '#84B0CA'}}></i>
                                                <span className="me-1 fw-bold">Status:</span>
                                                <span
                                                    className="badge bg-warning text-black fw-bold">{orderDetails.orderStatus}</span>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </div>
                                </div>

                                <div>
                                    <table className="table table-striped table-borderless">
                                        <thead style={{backgroundColor: "#84B0CA"}} className="text-white">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">SKU</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Unit Price</th>
                                            <th scope="col">Amount</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {orderDetails &&
                                            orderDetails.cartItems.map((item, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td><Image
                                                        src={item.primaryImageUrl}
                                                        rounded
                                                        fluid
                                                        alt="Shopping item"
                                                        style={{width: "65px"}}/></td>
                                                    <td>{item.productName}</td>
                                                    <td>{item.sku}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.finalPrice}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-xl-8">
                                    <p className="ms-3">Delivery and payment information</p>

                                </div>
                                <div className="col-xl-3">
                                    <ul className="list-unstyled">
                                        <li className="text-muted ms-3"><span
                                                className="text-black me-4">SubTotal</span>${orderDetails.subTotal}
                                            </li>
                                        <li className="text-muted ms-3 mt-2"><span
                                            className="text-black me-4">Delivery Method</span>{orderDetails.deliveryMethod}
                                        </li>
                                        <li className="text-muted ms-3 mt-2"><span
                                                className="text-black me-4">Delivery Price</span>$${orderDetails.deliveryPrice}
                                            </li>
                                        <li className="text-muted ms-3 mt-2"><span
                                            className="text-black me-4">Payment Method</span>{orderDetails.paymentMethod}
                                        </li>
                                    </ul>
                                    <p className="text-black float-start"><span className="text-black me-3">
                                        Total Amount</span><span
                                        style={{fontSize: "25px"}}>${orderDetails.paymentMethod}</span></p>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-xl-2">
                                    <Button type="button" variant={"dark"}
                                            className="btn btn-primary text-capitalize"
                                            >Packed
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invoice;