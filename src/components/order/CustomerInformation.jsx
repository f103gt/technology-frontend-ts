import React, {useState} from 'react';
import {Col, Form, Row} from "react-bootstrap";

const CustomerInformation = ({
                                 updateOrderFormData
                             }) => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
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
            </Col>
        </div>
    );
};

export default CustomerInformation;