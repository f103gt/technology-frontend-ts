import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import EmailConfirmModal from "./EmailConfirmModal";
import {useModalCloseOnSuccess} from "../utilities/useModalCloseOnSuccess";
import {communicateWithServer} from "../utilities/ServerCommunication";
import "../css/Exception.css";
import {validateEmail, validateName} from "../utilities/validationUtil";

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
        if (successResponse) {
            setShow(false);
            setShowEmailConfirm(true);
        } else {
            setShow(false);
        }
    };

    /*const handleEmailConfirm = () => {
        setShow(false);
        setShowEmailConfirm(true);

    };*/
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

    const handleRegistrationResponse = (response) => {
        setSuccessResponse(true);
        setShowEmailConfirm(true);
    }
    //TODO IF RESPONSE FROM THE SERVER IS 200 MOVE ON TO THE EMAIL VALIDATION

    const [errorMessage, setErrorMessage] = useState("");

    const [fullErrorMessage, setFullErrorMessage] = useState("");

    const handleRegistrationError = (error) => {
        setFullErrorMessage(error.message || error);
    }

    useEffect(() => {
        if (fullErrorMessage && fullErrorMessage.includes("409")) {
            setSuccessResponse(true);
            setShowEmailConfirm(true);
        }
        let trimmedErrorMessage =
            errorMessage.replace(/[A-Z]+|\d+/g, '').trim();
        setErrorMessage(trimmedErrorMessage);
    }, [setSuccessResponse, setShowEmailConfirm, fullErrorMessage, errorMessage]);

    const [initialsError, setInitialsError] = useState("");

    const [emailError, setEmailError] = useState("");

    const [nameError, setNameError] = useState("");
    const [surnameError, setSurnameError] = useState("");
    const sendRegisterRequest = (event) => {
        event.preventDefault();
        let allInputsValid = true;

        if (password !== passwordConfirm) {
            setPasswordsMatch(false);
            allInputsValid = false;
        } else {
            setPasswordsMatch(true);
        }

        let firstNameInvalid = validateName(firstName);
        if (firstNameInvalid) {
            setNameError(firstNameInvalid);
            allInputsValid = false;
        } else {
            setNameError("");
        }

        let lastNameInvalid = validateName(lastName);
        if (lastNameInvalid) {
            setSurnameError(lastNameInvalid);
            allInputsValid = false;
        } else {
            setSurnameError("");
        }

        let emailInvalid = validateEmail(email);
        if (emailInvalid) {
            setEmailError(emailInvalid);
            allInputsValid = false;
        } else {
            setEmailError("");
        }

        if (allInputsValid) {
            setPasswordsMatch(true);
            setNameError("");
            setSurnameError("");
            setEmailError("");

            const requestBody = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            };

            communicateWithServer({
                method: 'post',
                url: '/api/v1/auth/register',
                data: requestBody,
                executeFunction: handleRegistrationResponse,
                executeFunctionArgs: [setSuccessResponse, setShowEmailConfirm],
                handleError: handleRegistrationError
            });

        }
    };


    return (
        <div><Modal show={show} onHide={handleClose}
                    backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Registration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && <p style={{color: "#8b0000"}}
                                    className="error">{errorMessage}</p>}
                <Form onSubmit={sendRegisterRequest}>
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" value={firstName}
                                      onChange={updateFirstName}
                                      className={nameError ? "error-border" : ""}
                        />
                        {nameError && <div style={{color: "#8b0000"}}>{nameError}</div>}
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" value={lastName}
                                      onChange={updateLastName}
                                      className={surnameError ? "error-border" : ""}
                        />
                        {surnameError && <div style={{color: "#8b0000"}}>{surnameError}</div>}
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" value={email}
                                      onChange={updateEmail}
                                      className={emailError ? "error-border" : ""}/>
                        {emailError && <div style={{color: "#8b0000"}}>{emailError}</div>}
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password}
                                      onChange={updatePassword}
                                      className={emailError ? "error-border" : ""}/>
                    </Form.Group>
                    {
                        showPasswordConfirm ?
                            <Form.Group controlId="passwordConfirm">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" value={passwordConfirm}
                                              onChange={updatePasswordConfirm}
                                              className={emailError ? "error-border" : ""}/>
                                {!passwordsMatch && (
                                    <p style={{color: "#8b0000"}}>
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
                    <Button variant="dark" type="submit">Register</Button>
                </Form>
            </Modal.Body>
        </Modal>
            <EmailConfirmModal email={email} setShow={setShowEmailConfirm}
                               show={showEmailConfirm}/>
        </div>
    );
};

export default RegistrationModal;


/* axios.get('/csrf/api/v1')
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
            });*/