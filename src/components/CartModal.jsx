import React, {useContext} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {CartContext} from "../context/CartContext";
import CartItemCard from "./CartItemCard";

const CartModal = ({show, setShow}) => {
    const handleClose = () => setShow(false);
    const {items} = useContext(CartContext);


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Shopping Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {items.map((cartItem) => {
                    //console.log(cartItem);
                    return (
                        <CartItemCard cartItem={cartItem} key={cartItem.productName} />
                    );
                })}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {/* Other buttons */}
            </Modal.Footer>
        </Modal>
    )
        ;
};

export default CartModal;
