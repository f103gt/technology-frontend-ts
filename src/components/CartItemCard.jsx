import React, {useContext} from 'react';
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {CartContext} from "../context/CartContext";

const CartItemCard = (props) => {
    //TODO handle referential link to the product page
    //TODO add fetch of the product price from the server side
    const {addOneToCart,removeOneFromCart,deleteFromCart} =  useContext(CartContext);
    return (
        <Card>
            <Card.Img variant="top" src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp"
                      style={{ maxWidth: '40%', maxHeight: '40%' }}
                      alt="Laptop" loading={"lazy"} />
            <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                    <p><span className="text-muted"></span></p>
                    <h5 className="mb-0">
                        <Link to={`/${props.cartItem.categoryName}/${props.cartItem.productName}`}>{props.cartItem.productName}</Link>
                    </h5>
                    <h5 className="text-dark mb-0">{props.cartItem.cartItemPrice.toFixed(2)}$</h5>
                    <Button onClick={()=>addOneToCart(props.cartItem.productName)}>+</Button>
                    <span>{props.cartItem.cartItemQuantity}</span>
                    <Button onClick={()=>removeOneFromCart(props.cartItem.productName)}>-</Button>
                    <Button onClick={()=>deleteFromCart(props.cartItem.productName)}>Delete</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default CartItemCard;