import React, {useContext} from 'react';
import {Card, Col, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {CartContext} from "../context/CartContext";
import {FaTrashCan} from "react-icons/fa6";

const CartItemCard = (props) => {
    //TODO handle referential link to the product page
    //TODO add fetch of the product price from the server side
    const {addOneToCart, removeOneFromCart, deleteFromCart} = useContext(CartContext);
    return (
        <Card>
            <Card.Body className="p-12">
                <Row>
                    <Col lg={15}>
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
                                                <h5 className="mb-0">
                                                    <Link
                                                        to={`/${props.cartItem.categoryName}/${props.cartItem.productName}`}>{props.cartItem.productName}</Link>
                                                </h5>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs="auto" className="d-flex align-items-center">
                                        <Row>
                                            <Col style={{width: "15px"}}>
                                                <Button variant={"btn-secondary"}
                                                        onClick={() => addOneToCart(props.cartItem.productName)}>+</Button>
                                            </Col>
                                            <Col>
                                                <h5 className="fw-normal mb-0">{props.cartItem.cartItemQuantity}</h5>
                                            </Col>
                                            <Col style={{width: "15px"}}>
                                                <Button variant={"btn-secondary"}
                                                        onClick={() => removeOneFromCart(props.cartItem.productName)}>-</Button>
                                            </Col>
                                            <Col style={{width: "150px"}}>
                                                <h5 className="mb-0">{props.cartItem.cartItemPrice}$</h5>
                                            </Col>
                                            <Col style={{width: "80px"}}>
                                                <Button variant={"btn-link"}
                                                        onClick={() => deleteFromCart(props.cartItem.productName)}>
                                                    <FaTrashCan color={"grey"}/>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>

                    </Col>

                </Row>
            </Card.Body>
        </Card>




        /*<Card>
            <Card.Img variant="top" src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp"
                      style={{maxWidth: '40%', maxHeight: '40%'}}
                      alt="Laptop" loading={"lazy"}/>
            <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                    <p><span className="text-muted"></span></p>
                    <h5 className="mb-0">
                        <Link
                            to={`/${props.cartItem.categoryName}/${props.cartItem.productName}`}>{props.cartItem.productName}</Link>
                    </h5>
                    <h5 className="text-dark mb-0">{props.cartItem.cartItemPrice.toFixed(2)}$</h5>
                    <Button onClick={() => addOneToCart(props.cartItem.productName)}>+</Button>
                    <span>{props.cartItem.cartItemQuantity}</span>
                    <Button onClick={() => removeOneFromCart(props.cartItem.productName)}>-</Button>
                    <Button onClick={() => deleteFromCart(props.cartItem.productName)}>Delete</Button>
                </div>
            </Card.Body>
        </Card>*/
)
    ;
};

export default CartItemCard;