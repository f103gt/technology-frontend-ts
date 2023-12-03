import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {Form} from "react-bootstrap";
import ConfirmationComponent from "../components/ConfirmationComponent";
import {communicateWithServer} from "../utilities/ServerCommunication";
import {useExceptionHandling} from "../utilities/useExceptionHandling";
import {useModalCloseOnSuccess} from "../utilities/useModalCloseOnSuccess";

const NewEmployeesModal = ({show, setShow}) => {
    const [newEmployeesData, setNewEmployeesData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successResponse, setSuccessResponse] = useState(false);
    const {isReadyToClose} = useModalCloseOnSuccess(show, setShow, successResponse);

    const handleError = (error) => {
        setErrorMessage(error.message || error);
    }
    const handleSubmit = (newEmployeesData) => {
        const formData = new FormData();
        formData.append("newEmployeesData", newEmployeesData);
        communicateWithServer({
            url: "/admin/add-new-employees",
            method: "post",
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'},
            handleError: handleError,
            executeFunction: () => setSuccessResponse(true)
        })
    }
    const handleClose = () => {
        setShow(false);
        setErrorMessage("");
    }

    return (
        <Modal show={show} onHide={handleClose}
               backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Employees</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
                <Form>
                    <Form.Group controlId="data">
                        <Form.Label>Employees Data</Form.Label>
                        <Form.Control type={"file"} label="Employees Data" accept={".csv"}
                                      onChange={event => setNewEmployeesData(event.target.files[0])}/>
                    </Form.Group>
                </Form>
                <ConfirmationComponent
                    setSuccessResponse={() => setSuccessResponse(true)}
                    confirmationMatcher={'addNewEmployees'}
                    hint={"To confirm insertion of new category enter "}
                    onSubmitExecute={handleSubmit}
                    additionalParam={newEmployeesData}/>
            </Modal.Body>
        </Modal>
    );
};

export default NewEmployeesModal;