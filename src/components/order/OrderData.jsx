import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {CartContext} from "../../context/CartContext";
import CustomerInformation from "./CustomerInformation";
import DeliveryAddress from "./DeliveryAddress";
import {communicateWithServer} from "../../utilities/ServerCommunication";
import {useNavigate} from "react-router-dom";
import {useModalCloseOnSuccess} from "../../utilities/useModalCloseOnSuccess";

const OrderData = ({show, setShow}) => {
    const initialState = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        paymentMethod: "",
        deliveryMethod: "",
        deliveryAddress: "",
    }
    const addressData = {
        region: "",
        street: "",
        premise: "",
        postalCode: "",
        postalOffice: ""
    };

    const {getTotalCost} = useContext(CartContext);

    const [address, setAddress] = useState(addressData);
    const [paymentMethod, setPaymentMethod] = useState("none");
    const [deliveryMethod, setDeliveryMethod] = useState('none');
    const [orderFormData, setOrderFormData] = useState(initialState);
    const [deliveryMethodPrice, setDeliveryMethodPrice] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const updateOrderFormData = (data) => {
        setOrderFormData(prevState => ({...prevState, ...data}));
    };
    const updateDeliveryAddress = (data) => {
        setAddress(prevState => ({...prevState, ...data}));
    };
    const paymentMethods = {
        cash: {
            name: 'Cash',
            selected: false,
        },
        card: {
            name: 'Card',
            selected: false,
        },
        paypal: {
            name: 'PayPal',
            selected: false,
        },
    };


    const deliveryMethods = {
        courier: {
            name: 'Courier',
            selected: false,
            price: 20.00,
        },
        meest: {
            name: 'Meest',
            selected: false,
            price: 15.00,
        },
    };

    const updateDeliveryMethod = (method) => {
        setDeliveryMethod(method);
        const price = deliveryMethods[method]?.price || 0;
        setDeliveryMethodPrice(price);
        updateOrderFormData({deliveryMethod: method});
    };

    const totalPrice = getTotalCost() + deliveryMethodPrice;

    const updatePaymentMethod = (event) => {
        setPaymentMethod(event.target.value);
        updateOrderFormData({paymentMethod: event.target.value})
    }

    const navigate = useNavigate();
    const handleError = () => {
        navigate("/error");
    }

    const [successResponse, setSuccessResponse] = useState(false);
    const {isClose} = useModalCloseOnSuccess(show, setShow, successResponse);
    const { resetAll} = useContext(CartContext);

    const handleSuccessResponse = (response) => {
        setSuccessResponse(true);
        localStorage.removeItem("cartItems");
        resetAll([]);
    }
    const {items} = useContext(CartContext);
    useEffect(() => {
        if (orderFormData.deliveryAddress !== undefined && submitted && items.length > 0) {
            console.log(orderFormData);
            communicateWithServer({
                url: '/place-order',
                method: "post",
                data: orderFormData,
                handleError: handleError,
                executeFunction: handleSuccessResponse,
                executeFunctionArgs: [setSuccessResponse]
            });
        }
    }, [handleError, orderFormData, submitted]);


    const sendOrder = (event) => {
        event.preventDefault();
        const nonEmptyFields = Object.values(address).filter(value => value !== "");
        const combinedString = nonEmptyFields.join(" ");
        updateOrderFormData({deliveryAddress: combinedString});
        setSubmitted(true);
    };

    return (
        <Card bg="dark" text="white" className="rounded-3">
            <Card.Body>
                <Form className="pt-4" onSubmit={sendOrder}>
                    <Row>
                        <CustomerInformation updateOrderFormData={updateOrderFormData}
                        />
                        <DeliveryAddress
                            deliveryMethods={deliveryMethods}
                            updateAddressData={updateDeliveryAddress}
                            updateOrderFormData={updateOrderFormData}
                            updateDeliveryMethod={updateDeliveryMethod}
                        />
                    </Row>
                    <Row className="mt-3 mx-4">
                        <Col md={12}>
                            <Form.Label className="order-form-label">Payment Method</Form.Label>
                            <Form.Select
                                className="order-form-input" onChange={updatePaymentMethod}>
                                <option value="none">Select Payment Method</option>
                                {Object.keys(paymentMethods).map((method, index) => (
                                    <option key={index} value={method}>
                                        {paymentMethods[method].name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>

                    <hr className="my-4"/>
                    <Row className="justify-content-between">
                        <Col><p className="mb-2">Subtotal</p></Col>
                        <Col className="text-end"><p className="mb-2">${getTotalCost()}</p></Col>
                    </Row>
                    <Row className="justify-content-between">
                        <Col><p className="mb-2">Shipping</p></Col>
                        <Col className="text-end"><p className="mb-2">${deliveryMethodPrice}</p></Col>
                    </Row>
                    <Row className="justify-content-between mb-4">
                        <Col><p className="mb-2">Total</p></Col>
                        <Col className="text-end"><p className="mb-2">${totalPrice}</p>
                        </Col>
                    </Row>
                    <Button type="submit"
                            className="btn btn-outline-light btn-dark btn-block btn-lg">
                        <Row className="justify-content-between">
                            <Col><span>${totalPrice}</span></Col>
                            <Col className="text-end">
                                <span>Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i></span>
                            </Col>
                        </Row>
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default OrderData;

/*const [deliveryMethod,setDeliveryMethod] = useState("");
/*const updateDeliveryMethod = (event) => {
    setDeliveryMethod(event.target.value);
}

const updatePaymentMethod = (event) => {
    setPaymentMethod(event.target.value);
}*/

/*axios.get('/csrf/api/v1')
            .then(response => {
                const csrfToken = response.data.headers;

                axios({
                    method: 'post',
                    url: '/place-order',
                    data: orderFormData,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    withCredentials: true
                })
                    .then(response => {
                        if (response.status === 200) {
                            setShow(false);
                        }
                    })
                    .catch(error => {
                        alert(error);
                    });
            });*/