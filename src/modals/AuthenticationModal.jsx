import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import RegistrationModal from "./RegistrationModal";
import {communicateWithServer} from "../utilities/ServerCommunication";
import {useModalCloseOnSuccess} from "../utilities/useModalCloseOnSuccess";
import {useCartServerSynchronization} from "../utilities/useCartServerSynchronization";
import EmailConfirmModal from "./EmailConfirmModal";
import EventEmitter from "../events/EventEmitter";
import {validateEmail} from "../utilities/validationUtil";

/*TODO IF THE USER ALREADY EXISTS AND IS NOT ACTIVATED,
    SEND THE OTP AND REDIRECT RIGHT AWAY TO THE EMAIL VERIFICATION */
function AuthenticationModal({show, setShow}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showRegistration, setShowRegistration] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successResponse, setSuccessResponse] = useState(false);
    const {isReadyToClose} = useModalCloseOnSuccess(show, setShow, successResponse);
    const {synchronizeCartWithServer} = useCartServerSynchronization();
    const [emailConfirmation, setEmailConfirmation] = useState(false);
//TODO WHEN THE OTP IS CONFIRMED SYNCHRONIZE THE CART

    //TODO REPLACE WITH EVEN LISTENER
    useEffect(() => {
        let isRedirected = localStorage.getItem("redirected");
        if (isRedirected) {
            setShow(true);
            localStorage.removeItem("redirected");
        }
    }, [setShow]);

    useEffect(() => {
        const onRedirectToAuthenticationModal = (flag) => {
            if (flag) {
                setShow(true);
            }
        };

        EventEmitter.on('redirectToAuthenticationModal',
            onRedirectToAuthenticationModal);

        return () => {
            EventEmitter.off('redirectToAuthenticationModal',
                onRedirectToAuthenticationModal);
        };
    }, [setShow]);

    const updateUsername = (event) => {
        setUsername(event.target.value);
    }

    const updatePassword = (event) => {
        setPassword(event.target.value);
    }

    const [fullErrorMessage, setFullErrorMessage] = useState("");
    const [showEmailConfirm, setShowEmailConfirm] = useState(false);


    useEffect(() => {
        if (fullErrorMessage.includes("451")) {
            handleClose();
            setShowEmailConfirm(true);
            return;
        }
        setErrorMessage(removeNumbersAndCaps(fullErrorMessage).slice(1, -1));
    }, [setSuccessResponse, setShowEmailConfirm, fullErrorMessage, errorMessage, setShow]);

    const handleRegisterRedirection = () => {
        handleClose();
        setShowRegistration(true);
    }

    function removeNumbersAndCaps(str) {
        let filteredWords = [];
        let words = str.split(/\s+/);
        for (let word of words) {
            let hasNumbers = /\d/.test(word);
            let isCapsLock = word === word.toUpperCase();
            if (!hasNumbers && !isCapsLock) {
                filteredWords.push(word);
            }
        }
        return filteredWords.join(" ");
    }

    const handleAuthenticationResponse = (response) => {
        localStorage.setItem('userRole', response.data.role);
        synchronizeCartWithServer();
        setSuccessResponse(true);
        if (!response.data.uuid.isEmpty) {
            localStorage.setItem("id", response.data.uuid);
        }
    }

    const handleAuthenticationError = (error) => {
        setFullErrorMessage(error.message || error);
    }

    const [emailError, setEmailError] = useState("");

    const sendAuthRequest = (event) => {
        event.preventDefault();
        let allInputsValid = true;
        let emailInvalid = validateEmail(username);
        if (emailInvalid) {
            setEmailError(emailInvalid);
            allInputsValid = false;
        } else {
            setEmailError("");
        }

        const requestBody = {
            email: username,
            password: password,
        };
        communicateWithServer({
            method: 'post',
            url: '/api/v1/auth/authenticate',
            data: requestBody,
            executeFunction: handleAuthenticationResponse,
            executeFunctionArgs: [setSuccessResponse],
            handleError: handleAuthenticationError,
            reload: true
        });
    }

    const handleClose = () => {
        setErrorMessage("");
        setUsername("");
        setPassword("");
        setShow(false);
    }
    return (
        <div>
            <Modal show={show} onHide={handleClose}
                   backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage && <p
                        style={{color: "#8b0000"}}
                        className="error">{errorMessage}</p>}
                    <Form onSubmit={sendAuthRequest}>
                        <Form.Group controlId="emaiil">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={username} onChange={updateUsername}
                                          aria-describedby="emailHelp"/>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={updatePassword}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="checkBox">
                            <Form.Check type="checkbox" label="Remember me"/>
                        </Form.Group>
                        <Button variant="dark" type="submit">Login</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <p className="text-muted align-content-center">
                        Do not have an account yet?
                        <Button variant={"btn btn-link"} onClick={handleRegisterRedirection}>
                            Register</Button>
                    </p>
                </Modal.Footer>
            </Modal>
            <RegistrationModal show={showRegistration}
                               setShow={setShowRegistration}/>
            <EmailConfirmModal show={showEmailConfirm}
                               setShow={setShowEmailConfirm}/>
        </div>
    );
}

export default AuthenticationModal;

/*TODO WHEN AND WHY DO I NEED TO USE REDUX?
*  TO MINIMIZE UNNECESSARY SERVER COMMUNICATIONS?*/
