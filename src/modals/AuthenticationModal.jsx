import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import RegistrationModal from "./RegistrationModal";
import {communicateWithServer} from "../utilities/ServerCommunication";
import {useModalCloseOnSuccess} from "../utilities/useModalCloseOnSuccess";
import {useCartServerSynchronization} from "../utilities/useCartServerSynchronization";

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

    const updateUsername = (event) => {
        setUsername(event.target.value);
    }

    const updatePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleRegisterRedirection = () => {
        setShow(false);
        setShowRegistration(true);
    }

    const handleAuthenticationResponse = (response) => {
        synchronizeCartWithServer();
        localStorage.setItem('userRole', response.data.role);
        setSuccessResponse(true);
        if (!response.data.uuid.isEmpty) {
            localStorage.setItem("id", response.data.uuid);
        }
    }

    const handleAuthenticationError = (error) => {
        setErrorMessage(error.message || error);
    }


    const sendAuthRequest = (event) => {
        event.preventDefault();
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
                    {errorMessage && <p color={"red"} className="error">{errorMessage}</p>}
                    <Form onSubmit={sendAuthRequest} onHide={() => setShow(false)}>
                        <Form.Group controlId="emaiil">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={username} onChange={updateUsername}
                                          aria-describedby="emailHelp"/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
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
            <RegistrationModal show={showRegistration} setShow={setShowRegistration}/>
        </div>
    );
}

export default AuthenticationModal;
