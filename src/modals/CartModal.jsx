import React, {useContext, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {CartContext} from "../context/CartContext";
import CartItemCard from "../components/CartItemCard";
import OrderModal from "./OrderModal";
import {Col, Row} from "react-bootstrap";
import "../css/CartModal.css";

const CartModal = ({show, setShow}) => {
    const handleClose = () => setShow(false);
    const {items} = useContext(CartContext);
    const [showOrder, setShowOrder] = useState(false);

    return (
        <div>
            <Modal show={show} onHide={handleClose} dialogClassName={showOrder ? "modal-custom" : ""}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6} className="py-5 h-100">
                            <Row className="d-flex justify-content-center align-items-center h-100">
                                {items.map((cartItem) => {
                                    return (
                                        <CartItemCard cartItem={cartItem} key={cartItem.productName}/>
                                    );
                                })}
                            </Row>
                        </Col>
                        <Col md={6}>
                            {showOrder && <OrderModal/>}
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    {showOrder ?
                        null
                        :
                        <Button variant="dark" onClick={() => setShowOrder(true)}>Order</Button>
                    }
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CartModal;

