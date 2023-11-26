import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import axios from "axios";
import ConfirmationComponent from "../components/ConfirmationComponent";

const AddShiftsModal = ({show, setShow}) => {
    const [shifts, setShifts] = useState(null);

    const handleSubmit = (shifts) => {
        const formData = new FormData();
        formData.append("shifts", shifts);

        axios.get("/csrf/api/v1")
            .then(response => {
                const csrfToken = response.data.headers;
                axios({
                    method: 'post',
                    url: "/admin/distribute-shifts",
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
        <div>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Shifts Distribution</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="productDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type={"file"} label="Product Description" accept={".csv"}
                            onChange={event => setShifts(event.target.files[0])}/>
                    </Form.Group>
                </Form>
                <ConfirmationComponent hint={"To confirm insertion of new shifts enter"}
                                       confirmationMatcher={"distributeShifts"}
                                       onSubmitExecute={handleSubmit}
                                       additionalParam={shifts}
                                       setShow={setShow}
                />
            </Modal>
        </div>
    );
};

export default AddShiftsModal;