import React from 'react';
import Button from "react-bootstrap/Button";
import {Card, Col, Form, Image, Row} from "react-bootstrap";

const OrderModal = () => {

    return (
        <Card bg="dark" text="white" className="rounded-3">
            <Card.Body>
                <Form className="pt-4">
                    <Row>
                        <Col md={12}>
                            <Row className="mx-4">
                                <Col sm={6}>
                                    <Form.Group className="form-outline">
                                        <Form.Label htmlFor="form1">First Name</Form.Label>
                                        <Form.Control type="text" id="form1" className="order-form-input"/>
                                    </Form.Group>
                                </Col>
                                <Col sm={6} className="mt-2 mt-sm-0">
                                    <Form.Group className="form-outline">
                                        <Form.Label htmlFor="form2">Last Name</Form.Label>
                                        <Form.Control type="text" id="form2" className="order-form-input"/>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mx-4">
                                <Col sm={6}>
                                    <Form.Group className="form-outline">
                                        <Form.Label htmlFor="form1">Email </Form.Label>
                                        <Form.Control type="text" id="form1" className="order-form-input"/>
                                    </Form.Group>
                                </Col>
                                <Col sm={6} className="mt-2 mt-sm-0">
                                    <Form.Group className="form-outline">
                                        <Form.Label htmlFor="form2">Phone Number</Form.Label>
                                        <Form.Control type="text" id="form2" className="order-form-input"/>
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
                                    <Form.Label className="order-form-label">Address</Form.Label>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="form-outline">
                                        <Form.Control type="text" id="form5" className="order-form-input"/>
                                        <Form.Label htmlFor="form5">Region</Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col sm={6} className="mt-2 pe-sm-2">
                                    <Form.Group className="form-outline">
                                        <Form.Control type="text" id="form7" className="order-form-input"/>
                                        <Form.Label htmlFor="form7">Street</Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col sm={6} className="mt-2 ps-sm-0">
                                    <Form.Group className="form-outline">
                                        <Form.Control type="text" id="form8" className="order-form-input"/>
                                        <Form.Label htmlFor="form8">Premise</Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col sm={6} className="mt-2 pe-sm-2">
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
                    </Row>
                    <Row className="mt-3 mx-4">
                        <Col md={12}>
                            <Form.Label className="order-form-label">Card Information</Form.Label>
                        </Col>
                        <Col md={12}>
                            <Form.Group className="form-outline">
                                <Form.Control type="text" id="form5" className="order-form-input"/>
                                <Form.Label htmlFor="form5">Cardholder's Name</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col md={12} className="mt-2">
                            <Form.Group className="form-outline">
                                <Form.Control type="text" id="form6" className="order-form-input"/>
                                <Form.Label htmlFor="form6">Card Number</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col sm={6} className="mt-2 pe-sm-2">
                            <Form.Group className="form-outline">
                                <Form.Control type="text" id="form7" className="order-form-input"
                                              placeholder="MM/YYYY" minLength="7" maxLength="7"/>
                                <Form.Label htmlFor="form7">Expiration</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col sm={6} className="mt-2 pe-sm-2">
                            <Form.Group className="form-outline">
                                <Form.Control type="password" className="order-form-input"
                                              placeholder="&#9679;&#9679;&#9679;"
                                              minLength="3"
                                              maxLength="3"/>
                                <Form.Label htmlFor="form7">Cvv</Form.Label>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                <hr className="my-4"/>
                <Row className="justify-content-between">
                    <Col><p className="mb-2">Subtotal</p></Col>
                    <Col className="text-end"><p className="mb-2">$4798.00</p></Col>
                </Row>
                <Row className="justify-content-between">
                    <Col><p className="mb-2">Shipping</p></Col>
                    <Col className="text-end"><p className="mb-2">$20.00</p></Col>
                </Row>
                <Row className="justify-content-between mb-4">
                    <Col><p className="mb-2">Total</p></Col>
                    <Col className="text-end"><p className="mb-2">$4818.00</p></Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default OrderModal;