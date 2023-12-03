import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Alert, Form} from "react-bootstrap";
import axios from "axios";
import Button from "react-bootstrap/Button";
import {CartContext} from "../context/CartContext";

const EmailConfirmModal = ({email, setShow, show}) => {
    const [otp, setOtp] = useState("");
    const {items, deleteFromCart} = useContext(CartContext);
    const [showOtpAlert, setShowOtpAlert] = useState(false);
    const [showRegisterAlert, setShowRegisterAlert] = useState(false);
    const [isReadyToClose, setIsReadyToClose] = useState(false);

    const handleModalClose = () => {
        if (isReadyToClose) {
            return;
        }
        setShow(false);
    };

    const handleAlert = (setFunction, timeout) => {
        setFunction(true);
        if (!timeout) {
            timeout = 3000;
        }
        setTimeout(() => {
            setFunction(false);
        }, timeout);
    }

    const showAlert = (showCheckup, message) => {
        if (showCheckup) {
            return (
                <Alert variant="success">
                    message
                </Alert>
            );
        }
    }

    const handleUserCartNotEmpty = () => {
        if (items.length > 0) {
            items.forEach((cartItem) => {
                deleteFromCart(cartItem.productName);
            });
        }
        handleAlert(setShowRegisterAlert, 3000);
        setIsReadyToClose(false);
        setShow(false);
    }

    const sendEmailConfirmationRequest = (event) => {
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
                            /*if (items.length > 0) {
                                items.forEach((cartItem) => {
                                    deleteFromCart(cartItem.productName);
                                });
                            }*/
                            /*TODO REPLACE WITH ANOTHER SERVER CALL THAT WILL
                                ACTUALLY STORE ALL THE CART ITEMS ON THE SERVER SIDE*/
                            localStorage.setItem('userRole', response.data.role);
                            handleAlert(setShowRegisterAlert, 3000);

                            setIsReadyToClose(false);
                            setShow(false);
                        }
                    })
                    .catch(error => {
                        alert(error);
                    });
                //TODO DISPLAY SERVER ERROR
            });

    }

    /*TODO HOW TO PREVENT USER FROM CLOSING THE MODAL IF OTP IS
    *   NOT ENTERED OR PROVIDED INCORRECTLY?
    *   IS IT EVEN A COMMON PRACTICE? IS IT NECESSARY? */

    const handleSendAgain = (event) => {
        event.preventDefault();
        axios.get('/csrf/api/v1')
            .then(response => {
                const csrfToken = response.data.headers;
                axios({
                    method: 'get',
                    url: `/api/v1/auth/update-otp?email=${email}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    withCredentials: true
                })
                    .then(response => {
                        if (response.status === 200) {
                            handleAlert(setShowOtpAlert, 3000);
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
            <Modal onHide={handleModalClose} show={show}
                   backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Email Confirmation</Modal.Title>
                </Modal.Header>
                <Form onSubmit={sendEmailConfirmationRequest}>
                    <Modal.Body>
                        <Form.Text className="text-muted">
                            <div>We have sent a confirmation email to your registered email address. Please check your
                                inbox (and spam folder, just in case) for our email and enter the provided code
                                to complete your registration.

                                If you don’t receive the email within a few minutes, please make sure you entered your
                                email address correctly and try again.

                                Thank you for registering with us!
                            </div>
                        </Form.Text>
                        <Form.Group controlId="otp">
                            <Form.Control type="text" value={otp}
                                          onChange={(event) => setOtp(event.target.value)}
                                          aria-describedby="emailHelp"/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={"dark"} type="submit">Verify</Button>
                        {showAlert(showRegisterAlert,
                            "Congratulations upon successful registration." +
                            "Now login into the system")}
                        <Button varian={"dark"} type={"button"}
                                onClick={handleSendAgain}>
                            Send again</Button>
                        {showAlert(showOtpAlert, "OTP Sent Successfully")}
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default EmailConfirmModal;