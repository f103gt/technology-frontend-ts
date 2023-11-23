import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";

const AddShiftsModal = ({show, setShow}) => {
    const [shifts, setShifts] = useState(null);
    const [confirmation, setConfirmation] = useState("");
    const [confirmationMatches, setConfirmationMatches] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();

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

    const handleConfirmation = (event) => {
        const enteredConfirmation = event.target.value;
        setConfirmation(enteredConfirmation);
        setConfirmationMatches(enteredConfirmation === 'distributeShifts');
    };


    return (
        <div>
            <Modal show={show} onHide={() => setShow(false)}
                   onExit={() => setConfirmation("")}>
                <Modal.Header closeButton>
                    <Modal.Title>Shifts Distribution</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group controlId="productDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type={"file"} label="Product Description" accept={".csv"}
                                          onChange={event => setShifts(event.target.files[0])}/>
                        </Form.Group>
                        <Form.Group controlId="productSku">
                            <Form.Text>
                                To confirm insertion of new category enter <em>distributeShifts</em>
                            </Form.Text>
                            <Form.Control
                                type="text" value={confirmation} onChange={handleConfirmation}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" type="submit"
                                disabled={!confirmationMatches}>Submit</Button>
                    </Modal.Footer>
                </Form>

            </Modal>
        </div>
    );
};

export default AddShiftsModal;