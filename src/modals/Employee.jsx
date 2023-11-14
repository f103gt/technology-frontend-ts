import React, {useState} from 'react';
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import {Col, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../css/EmployeeModal.css";
const Employee = ({show, setShow}) => {
    const [username, setUsername] = useState('');
    const [position, setPosition] = useState('');

    const handleClose = () => setShow(false);

    const updateUsername = (event) => {
        setUsername(event.target.value);
    }

    const updatePosition = (event) => {
        setPosition(event.target.value);
    }

    const sendAuthRequest = (event) => {
        event.preventDefault();
        const requestBody = {
            email: username,
            position: position,
        };

        axios.get('/csrf/api/v1')
            .then(response => {
                const csrfToken = response.data.headers;
                axios({
                    method: 'post',
                    url: '/api/v1/admin/register-new-employee',
                    data: requestBody,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    withCredentials: true
                })
                    .catch(error => {
                        alert(error);
                    });
            });
    }

    //TODO get roles from the server

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={sendAuthRequest} onHide={() => setShow(false)}>
                    <Row>
                        <Col md={6} className="py-5 h-100">
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
                                <Form.Control as="select" value={position} onChange={updatePosition} custom>
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                    <option>Option 3</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="checkBox">
                                <Form.Check type="checkbox" label="Remember me"/>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="py-5 h-100">

                        </Col>
                        <Button variant="dark" type="submit">Login</Button>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default Employee;