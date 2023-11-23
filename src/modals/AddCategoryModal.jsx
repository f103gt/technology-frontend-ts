import React, {useState} from 'react';
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const AddCategoryModal = ({show, setShow, parentCategoryName}) => {
    const [confirmation, setConfirmation] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [confirmationMatches, setConfirmationMatches] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();

        const requestBody = {
            parentCategory: parentCategoryName,
            category: categoryName
        }
        axios.get("/csrf/api/v1")
            .then(response => {
                const csrfToken = response.data.headers;
                axios({
                    method: 'post',
                    url: "/api/v1/add-category",
                    data: requestBody,
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
                        alert(error)
                    });
            });
    }
    const handleConfirmation = (event) => {
        const enteredConfirmation = event.target.value;
        setConfirmation(enteredConfirmation);
        setConfirmationMatches(enteredConfirmation === 'addCategory');
    };

    return (
        <Modal show={show} onHide={() => setShow(false)}
               onExit={() => {
                   setConfirmation("");
                   setCategoryName("")
               }}>
            <Modal.Header closeButton>
                <Modal.Title>New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="productName">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control type="text" value={categoryName} onChange={e => setCategoryName(e.target.value)}/>
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

export default AddCategoryModal;