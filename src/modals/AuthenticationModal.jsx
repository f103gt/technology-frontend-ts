import React, {useState} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import RegistrationModal from "./RegistrationModal";

function AuthenticationModal({show,setShow}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showRegistration, setShowRegistration] = useState(false);

    const handleClose = () => setShow(false);

    const updateUsername = (event) => {
        setUsername(event.target.value);
    }

    const updatePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleRegisterRedirection = ()=> {
        setShow(false);
        setShowRegistration(true);
    }

    const sendAuthRequest = (event) => {
        event.preventDefault();
        const requestBody = {
            email: username,
            password: password,
        };

        axios.get('/csrf/api/v1')
            .then(response => {
                const csrfToken = response.data.headers;
                axios({
                    method: 'post',
                    url: '/api/v1/auth/authenticate',
                    data: requestBody,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    withCredentials: true
                })
                    .then(response => {
                        if (response.status === 200) {
                            localStorage.setItem('userRole', response.data.role);
                            handleClose();
                        }
                    })
                    .catch(error => {
                        alert(error);
                    });
            });
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
