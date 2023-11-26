import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import axios from "axios";
import Button from "react-bootstrap/Button";
import {CartContext} from "../context/CartContext";

const EmailConfirmModal = ({email,setShow,show}) => {
    const [otp,setOtp] = useState("");
    const {items,deleteFromCart} = useContext(CartContext);
    const sendEmailConfirmationRequest = (event)=>{
        event.preventDefault();
        axios.get('/csrf/api/v1')
            .then(response => {
                const csrfToken = response.data.headers;
                axios({
                    method: 'post',
                    url: '/api/v1/auth/otp-verification',
                    data: otp,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    withCredentials: true
                })
                    .then(response => {
                        if (response.status === 200) {
                            if (items.length > 0) {
                                items.forEach((cartItem) => {
                                    deleteFromCart(cartItem.productName);
                                });
                            }
                           setShow(false);
                        }
                    })
                    .catch(error => {
                        alert(error);
                    });
                //TODO DISPLAY SERVER ERROR
            });
    }


    //TODO SHOW ONLY WHEN THE RESPONSE FROM THE SERVER WAS RECEIVED AND RESPONSE IS 200

    /*TODO HOW TO PREVENT USER FROM CLOSING THE MODAL IF OTP IS
    *   NOT ENTERED OR PROVIDED INCORRECTLY?
    *   IS IT EVEN A COMMON PRACTICE? IS IT NECESSARY? */

    const handleSendAgain = (event)=>{
        event.preventDefault();
        axios.get('/csrf/api/v1')
            .then(response => {
                const csrfToken = response.data.headers;
                axios({
                    method: 'post',
                    url: '/api/v1/auth/update-otp',
                    data: email,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    withCredentials: true
                })
                    .then(response => {
                        if (response.status === 200) {
                            setShow(false);
                        }
                    })
                    .catch(error => {
                        alert(error);
                    });
                //TODO DISPLAY SERVER ERROR
            });
    }
    return (
        <div>
            <Modal onHide={()=>setShow(false)} show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Email Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={sendEmailConfirmationRequest}>
                        <Form.Text className="text-muted">
                            <div>We have sent a confirmation email to your registered email address. Please check your
                                inbox (and spam folder, just in case) for our email and enter the provided code
                                to complete your registration.

                                If you don’t receive the email within a few minutes, please make sure you entered your
                                email address correctly and try again.

                                Thank you for registering with us!</div>
                        </Form.Text>
                        <Form.Group controlId="otp">
                            <Form.Control type="text" value={otp}
                                          onChange={(event)=>setOtp(event.target.value)}
                                          aria-describedby="emailHelp"/>
                        </Form.Group>
                        <Button variant="dark" type="submit">Verify</Button>
                    </Form>
                    <Button varian={"dark"} type={"button"}
                            onClick={handleSendAgain}>
                        Send again</Button>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default EmailConfirmModal;