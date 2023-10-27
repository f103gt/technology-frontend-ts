import React from 'react';
import {Card} from "react-bootstrap";

const CartItem = (cartItem) => {
    //TODO handle referential link to the product page
    return (
        <Card>
            <Card.Img variant="top" src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp" alt="Laptop" loading={"lazy"} />
            <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                    <p><span className="text-muted"></span></p>
                    <h5 className="mb-0">
                        <span >{cartItem.productName}</span>
                    </h5>
                    <h5 className="text-dark mb-0">{cartItem.cartItemPrice.toFixed(2)}$</h5>
                </div>
            </Card.Body>
        </Card>
    );
};

export default CartItem;