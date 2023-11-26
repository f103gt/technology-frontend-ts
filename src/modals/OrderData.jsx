import React, {useContext, useState} from 'react';
import {Card, Col, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {CartContext} from "../context/CartContext";
import axios from "axios";
import CustomerInformation from "../components/CustomerInformation";
import DeliveryAddress from "../components/DeliveryAddress";

const OrderData = () => {
    const initialState = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        deliveryAddress: "",
        paymentMethod: "",
        deliveryMethod: "",
    };
    const [orderFormData, setOrderFormData] = useState(initialState);

    // Function to update order form data
    const updateOrderFormData = (data) => {
        setOrderFormData({...orderFormData, ...data});
    };

    const {getTotalCost} = useContext(CartContext);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [deliveryMethod, setDeliveryMethod] = useState({
        name: 'Courier',
        selected: true,
        price: 20.00,
    });
    const [paymentMethods, setPaymentMethods] = useState({
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
    });

    const updatePaymentMethod = (event) => {
        setPaymentMethod(event.target.value);
        updateOrderFormData({paymentMethod: event.target.value})

    }

    //TODO ON THE SERVER SIDE RECALCULATE TOTAL COST

    const sendOrder = (event) => {
        event.preventDefault();
        console.log(orderFormData);
        axios.get('/csrf/api/v1')
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
                            //TODO successful order placement pop up
                        }
                    })
                    .catch(error => {
                        alert(error);
                    });
            });
    }

    return (
        <Card bg="dark" text="white" className="rounded-3">
            <Card.Body>
                <Form className="pt-4" onSubmit={sendOrder}>
                    <Row>
                        <CustomerInformation firstName={firstName} setFirstName={setFirstName}
                                             lastName={lastName} setLastName={setLastName} email={email}
                                             setEmail={setEmail}
                                             phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                                             address={address} setAddress={setAddress}
                                             deliveryMethod={deliveryMethod} setDeliveryMethod={setDeliveryMethod}
                                             updateOrderFormData={updateOrderFormData}
                        />
                        <DeliveryAddress deliveryMethod={deliveryMethod}
                                         setDeliveryMethod={setDeliveryMethod}
                                         address={address}
                                         setAddress={setAddress}
                                         updateOrderFormData={updateOrderFormData}
                        />
                    </Row>
                    <Row className="mt-3 mx-4">
                        <Col md={12}>
                            <Form.Label className="order-form-label">Payment Method</Form.Label>
                            <Form.Select
                                className="order-form-input" onChange={updatePaymentMethod}>
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
                        <Col className="text-end"><p className="mb-2">${deliveryMethod.price}</p></Col>
                    </Row>
                    <Row className="justify-content-between mb-4">
                        <Col><p className="mb-2">Total</p></Col>
                        <Col className="text-end"><p className="mb-2">${getTotalCost() + deliveryMethod.price}</p>
                        </Col>
                    </Row>
                    <Button type="submit"
                            className="btn btn-outline-light btn-dark btn-block btn-lg">
                        <Row className="justify-content-between">
                            <Col><span>${getTotalCost() + deliveryMethod.price}</span></Col>
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
