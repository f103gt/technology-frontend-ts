import React, {useState} from 'react';
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import EmailConfirmModal from "./EmailConfirmModal";
import {useModalCloseOnSuccess} from "../utilities/useModalCloseOnSuccess";
import {communicateWithServer} from "../utilities/ServerCommunication";

const RegistrationModal = ({show, setShow}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showEmailConfirm, setShowEmailConfirm] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const [successResponse, setSuccessResponse] = useState(false);
    const {isReadyToClose} = useModalCloseOnSuccess(show, setShow, successResponse);
    const handleClose = () => {
        setShow(false);
        setShowEmailConfirm(true);
    };

    const handleEmailConfirm = () => {
        setShow(false);
        setShowEmailConfirm(true);

    };
    const updateFirstName = (event) => {
        setFirstName(event.target.value);
    }

    const updateLastName = (event) => {
        setLastName(event.target.value);
    }
    const updateEmail = (event) => {
        setEmail(event.target.value);
    }

    const updatePassword = (event) => {
        setPassword(event.target.value);
        setShowPasswordConfirm(true);
    }

    const updatePasswordConfirm = (event) => {
        setPasswordConfirm(event.target.value);
    }

    const handleRegistrationResponse = (response)=>{

    }

    const sendRegisterRequest = (event) => {
        if (password !== passwordConfirm) {
            setPasswordsMatch(false);
        }
        event.preventDefault();
        const requestBody = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        };

       /* communicateWithServer({
            method: 'post',
            url: '/api/v1/auth/authenticate',
            data: requestBody,
            executeFunction: handleAuthenticationResponse,
            executeFunctionArgs: [setSuccessResponse],
            handleError: handleAuthenticationError,
            reload: true
        });
*/
        axios.get('/csrf/api/v1')
            .then(response => {
                const csrfToken = response.data.headers;
                axios({
                    method: 'post',
                    url: '/api/v1/auth/register',
                    data: requestBody,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    withCredentials: true
                })
                    .then(response => {
                        if (response.status === 200) {
                            handleClose();
                            handleEmailConfirm();
                        }
                    })
                    .catch(error => {
                        alert(error);
                    });
                //TODO DISPLAY SERVER ERROR
            });
    }

    return (
        <div><Modal show={show} onHide={handleClose}
                    backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Registration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={sendRegisterRequest} onHide={() => setShow(false)}>
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" value={firstName}
                                      onChange={updateFirstName}/>
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" value={lastName}
                                      onChange={updateLastName}/>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={email}
                                      onChange={updateEmail}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password}
                                      onChange={updatePassword}/>
                    </Form.Group>
                    {
                        showPasswordConfirm ?
                            <Form.Group controlId="passwordConfirm">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" value={passwordConfirm}
                                              onChange={updatePasswordConfirm}/>
                                {!passwordsMatch && (
                                    <p style={{color: 'red'}}>
                                        Passwords do not match.
                                    </p>
                                )}
                            </Form.Group>
                            :
                            null
                    }
                    <Form.Group className="mb-3" controlId="checkBox">
                        <Form.Check type="checkbox" label="Remember me"/>
                    </Form.Group>
                    <Button variant="dark" type="submit" onClick={handleEmailConfirm}
                    >Register</Button>
                </Form>
            </Modal.Body>
        </Modal>
            <EmailConfirmModal email={email} setShow={setShowEmailConfirm}
                               show={showEmailConfirm}/>
        </div>
    );
};

export default RegistrationModal;