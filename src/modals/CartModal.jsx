import React, {useContext, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {CartContext} from "../context/CartContext";
import CartItemCard from "../components/CartItemCard";
import OrderData from "../components/order/OrderData";
import {Col, Row} from "react-bootstrap";
import "../css/CartModal.css";
import ToDoList from "../pages/ToDoList";
import PrivateRoute from "../routes/PrivateRoute";
import {RoleContext} from "../context/RoleProvider";
import EventEmitter from "../events/EventEmitter";

const CartModal = ({show, setShow}) => {
    const handleClose = () => setShow(false);
    const {items} = useContext(CartContext);
    const [showOrder, setShowOrder] = useState(false);
    const {userRole} = useContext(RoleContext);

    const handleSetShowOrder = () => {
        if (userRole === 'user') {
            setShowOrder(true);
        } else if (userRole === 'guest' || !userRole) {
            setShow(false);
            EventEmitter.emit('redirectToAuthenticationModal',
                true);
        }
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}
                   dialogClassName={showOrder && items.length > 0 ? "modal-custom" : ""}
                   onExited={() => setShowOrder(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={showOrder ? 6 : 12} className="py-5 h-100">
                            <Row className="d-flex justify-content-center align-items-center h-100">
                                {items.map((cartItem) => {
                                    return (
                                        <CartItemCard cartItem={cartItem} key={cartItem.productName}/>
                                    );
                                })}
                            </Row>
                        </Col>
                        <Col md={6}>
                            <PrivateRoute component={ToDoList} roles={["user"]}>
                                {showOrder && items.length > 0 &&
                                    <OrderData setShow={setShow}/>}
                            </PrivateRoute>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    {showOrder && items.length > 0 ?
                        null
                        :
                        <Button variant="dark" onClick={handleSetShowOrder}>Order</Button>
                    }
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CartModal;

