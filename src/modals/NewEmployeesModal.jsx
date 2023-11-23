import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const NewEmployeesModal = ({show, setShow}) => {
    const [newEmployeesData, setNewEmployeesData] = useState(null);
    const [confirmation, setConfirmation] = useState("");
    const [confirmationMatches, setConfirmationMatches] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("newEmployeesData", newEmployeesData);

        axios.get("/csrf/api/v1")
            .then(response => {
                const csrfToken = response.data.headers;
                axios({
                    method: 'post',
                    url: "/admin/add-new-employees",
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    withCredentials: true
                })
                    .catch(error => {
                        alert(error)
                    });
            });

    }

    const handleConfirmation = (event) => {
        const enteredConfirmation = event.target.value;
        setConfirmation(enteredConfirmation);
        setConfirmationMatches(enteredConfirmation === 'addNewEmployees');
    };
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="productDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type={"file"} label="Product Description" accept={".csv"}
                                      onChange={event => setNewEmployeesData(event.target.files[0])}/>
                    </Form.Group>
                    <Form.Group controlId="productSku">
                        <Form.Text>
                            To confirm insertion of new category enter <em>addCategory</em>
                        </Form.Text>
                        <Form.Control type="text" value={confirmation} onChange={handleConfirmation}/>
                    </Form.Group>
                    <Button variant="dark" type="submit"
                            disabled={!confirmationMatches}>Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default NewEmployeesModal;