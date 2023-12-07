import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import ConfirmationComponent from "../components/ConfirmationComponent";
import {communicateWithServer} from "../utilities/ServerCommunication";
import {useModalCloseOnSuccess} from "../utilities/useModalCloseOnSuccess";

const AddShiftsModal = ({show, setShow}) => {
    const [shifts, setShifts] = useState(null);

    const [errorMessage, setErrorMessage] = useState("");
    const [successResponse, setSuccessResponse] = useState(false);
    const {isReadyToClose} = useModalCloseOnSuccess(show, setShow, successResponse);

    const handleError = (error) => {
        setErrorMessage(error.message || error);
    }

    const handleSuccessResponse = () => {
        setSuccessResponse(true);
    }
    const handleSubmit = (shifts) => {
        const formData = new FormData();
        formData.append("shifts", shifts);
        communicateWithServer({
            url: "/admin/distribute-shifts",
            method: "post",
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'},
            handleError: handleError,
            executeFunction: handleSuccessResponse,
            executeFunctionArgs: [setSuccessResponse]
        })

    }
    const handleClose = () => {
        setShow(false);
        setErrorMessage("");
    }
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shifts Distribution</Modal.Title>
                </Modal.Header>
                {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="productDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type={"file"} label="Product Description" accept={".csv"}
                            onChange={event => setShifts(event.target.files[0])}/>
                    </Form.Group>
                </Form>
                <ConfirmationComponent hint={"To confirm insertion of new shifts enter "}
                                       confirmationMatcher={"distributeShifts"}
                                       onSubmitExecute={handleSubmit}
                                       additionalParam={shifts}/>
            </Modal>
        </div>
    );
};

export default AddShiftsModal;