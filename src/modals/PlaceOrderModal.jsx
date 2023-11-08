import React from 'react';
import Button from "react-bootstrap/Button";
import {Image, Col, Form, Row, Card, Dropdown, Breadcrumb} from "react-bootstrap";

const PlaceOrderModal = () => {
    return (
        <div>
            <section className="h-100 h-custom" style={{backgroundColor: "#eee"}}>
                <Col className="py-5 h-100">
                    <Row className="d-flex justify-content-center align-items-center h-100">
                        <Col>
                            <Card>
                                <Card.Body className="p-4">
                                    <Row>
                                        <Col lg={6}>
                                            <Breadcrumb className="mb-3">
                                                <Breadcrumb.Item href="#">
                                                    <i className="fas fa-long-arrow-alt-left me-2"></i>Continue shopping
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                            <hr/>
                                            <Row className="justify-content-between align-items-center mb-4">
                                                <Col>
                                                    <p className="mb-1">Shopping cart</p>
                                                    <p className="mb-0">You have 4 items in your cart</p>
                                                </Col>
                                                <Col>
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="link" id="dropdown-basic">
                                                            Sort by: price <i className="fas fa-angle-down mt-1"></i>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                            <Dropdown.Item href="#/action-2">Another
                                                                action</Dropdown.Item>
                                                            <Dropdown.Item href="#/action-3">Something
                                                                else</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Col>
                                            </Row>

                                            <Card className="mb-3">
                                                <Card.Body>
                                                    <Row className="justify-content-between align-items-center">
                                                        <Col xs="auto" className="d-flex align-items-center">
                                                            <Image
                                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                                                rounded
                                                                fluid
                                                                alt="Shopping item"
                                                                style={{width: "65px"}}/>
                                                            <Row className="ms-3">
                                                                <Col>
                                                                    <h5>Iphone 11 pro</h5>
                                                                    <p className="small mb-0">256GB, Navy Blue</p>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col xs="auto" className="d-flex align-items-center">
                                                            <Row>
                                                                <Col style={{width: "50px"}}>
                                                                    <h5 className="fw-normal mb-0">2</h5>
                                                                </Col>
                                                                <Col style={{width: "80px"}}>
                                                                    <h5 className="mb-0">$900</h5>
                                                                </Col>
                                                            </Row>
                                                            <Button variant="link" style={{color: "#cecece"}}>
                                                                <i className="fas fa-trash-alt"></i>
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>

                                            {/* Repeat the above card structure for other items in the shopping cart */}

                                        </Col>

                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </section>
        </div>
    );
};

export default PlaceOrderModal;