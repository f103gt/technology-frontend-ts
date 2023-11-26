import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {Form} from "react-bootstrap";
import ConfirmationComponent from "../components/ConfirmationComponent";

const NewEmployeesModal = ({show, setShow}) => {
    const [newEmployeesData, setNewEmployeesData] = useState(null);
    const handleSubmit = (newEmployeesData) => {
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

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Employees</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="data">
                        <Form.Label>Employees Data</Form.Label>
                        <Form.Control type={"file"} label="Employees Data" accept={".csv"}
                                      onChange={event => setNewEmployeesData(event.target.files[0])}/>
                    </Form.Group>
                </Form>
                    <ConfirmationComponent setShow={setShow}
                                           confirmationMatcher={'addNewEmployees'}
                                           hint={"To confirm insertion of new category enter "}
                                           onSubmitExecute={handleSubmit}
                                           additionalParam={newEmployeesData}
                    />
            </Modal.Body>
        </Modal>
    );
};

export default NewEmployeesModal;