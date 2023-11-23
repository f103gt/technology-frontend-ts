import React from 'react';
import {Col, Form, Row} from "react-bootstrap";

const CardInformationComponent = () => {
    return (
        <div>
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
        </div>
    );
};

export default CardInformationComponent;