import React, {useState} from 'react';
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import ConfirmationComponent from "../components/ConfirmationComponent";

const AddCategoryModal = ({show, setShow, parentCategoryName}) => {
    const [categoryName, setCategoryName] = useState("");
    const handleSubmit = () => {
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

    return (
        <Modal show={show} onHide={() => setShow(false)}
               onExit={() => {
                   setCategoryName("");
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
                </Form>
                <ConfirmationComponent confirmationMatcher={"addCategory"}
                                       hint={"To confirm insertion of a new category enter"}
                                       setShow={setShow}
                                       onSubmitExecute={handleSubmit}/>
            </Modal.Body>
        </Modal>
    );
};

export default AddCategoryModal;