import React, {useState} from 'react';
import {Col, Form, Row} from "react-bootstrap";
import AddressInput from "./AddressInput";

const CustomerInformation = ({
                                 firstName, setFirstName,
                                 lastName, setLastName,
                                 email, setEmail,
                                 phoneNumber, setPhoneNumber,
                                 address, setAddress,
                                 deliveryMethod, setDeliveryMethod,
                                 updateOrderFormData

                             }) => {
    const [subAddress, setSubAddress] = useState("");

    const [deliveryMethods, setDeliveryMethods] = useState({
        courier: {
            name: 'Courier',
            selected: true,
            price: 20.00,
        }
    });

    const updateFirstName = (event) => {
        setFirstName(event.target.value);
        updateOrderFormData({firstName: event.target.value})

    }

    const updateLastName = (event) => {
        setLastName(event.target.value);
        updateOrderFormData({lastName: event.target.value})

    }
    const updateEmail = (event) => {
        setEmail(event.target.value);
        updateOrderFormData({email: event.target.value})

    }

    const updatePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
        updateOrderFormData({phoneNumber: event.target.value})

    }

    const updateAddress = (event) => {
        setAddress(event.target.value);
        updateOrderFormData({address: event.target.value})
    }



    return (
        <div>
            <Col md={12}>
                <Row className="mx-4">
                    <Col sm={6}>
                        <Form.Group className="form-outline">
                            <Form.Label htmlFor="form1">First Name</Form.Label>
                            <Form.Control type="text" id="form1" value={firstName}
                                          onChange={updateFirstName}
                                          className="order-form-input"/>
                        </Form.Group>
                    </Col>
                    <Col sm={6} className="mt-2 mt-sm-0">
                        <Form.Group className="form-outline">
                            <Form.Label htmlFor="form2">Last Name</Form.Label>
                            <Form.Control type="text" id="form2" value={lastName}
                                          onChange={updateLastName}
                                          className="order-form-input"/>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mx-4">
                    <Col sm={6}>
                        <Form.Group className="form-outline">
                            <Form.Label htmlFor="form1">Email </Form.Label>
                            <Form.Control type="text" id="form1"
                                          onChange={updateEmail} value={email}
                                          className="order-form-input"/>
                        </Form.Group>
                    </Col>
                    <Col sm={6} className="mt-2 mt-sm-0">
                        <Form.Group className="form-outline">
                            <Form.Label htmlFor="form2">Phone Number</Form.Label>
                            <Form.Control type="text" id="form2" value={phoneNumber}
                                          onChange={updatePhoneNumber}
                                          className="order-form-input"/>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-3 mx-4">
                    <Col md={12}>
                        <Form.Label className="order-form-label"
                                    htmlFor="date-picker-example">Date</Form.Label>
                    </Col>
                </Row>

                <Row className="mt-3 mx-4">
                    <Col md={12}>
                        <Form.Label className="order-form-label">Delivery</Form.Label>
                        {/*<Dropdown></Dropdown>*/}
                    </Col>
                    <Col md={12}>
                        <Form.Group className="form-outline">
                            {/*<Form.Control type="text" id="form5" className="order-form-input"/>*/}
                            <AddressInput value={address} onChange={updateAddress}/>
                            <Form.Label htmlFor="form5">Region</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="form-outline">
                            <Form.Control type="text" id="form5" className="order-form-input"/>
                            <Form.Label htmlFor="form5">Street</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col sm={3} className="mt-2 mt-sm-0">
                        <Form.Group className="form-outline">
                            <Form.Control type="text" id="form8" className="order-form-input"/>
                            <Form.Label htmlFor="form8">Premise</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col sm={3} className="mt-2 mt-sm-0">
                        <Form.Group className="form-outline">
                            <Form.Control type="text" id="form9" className="order-form-input"/>
                            <Form.Label htmlFor="form9">Postal / Zip Code</Form.Label>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-3 mx-4">
                    <Col md={12}>
                        {/*<Form.Check>
                                            <Form.Check.Input type="checkbox" value="" id="flexCheckDefault"/>
                                            <Form.Check.Label htmlFor="flexCheckDefault">I know what I need to
                                                know</Form.Check.Label>
                                        </Form.Check>*/}
                    </Col>
                </Row>
            </Col>
        </div>
    );
};

export default CustomerInformation;