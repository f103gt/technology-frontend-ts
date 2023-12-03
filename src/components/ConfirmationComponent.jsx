import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const ConfirmationComponent = ({
                                   setSuccessResponse,
                                   hint,
                                   confirmationMatcher,
                                   setShow,
                                   onSubmitExecute,
                                   additionalParam
                               }) => {
    const [confirmation, setConfirmation] = useState("");
    const [confirmationMatches, setConfirmationMatches] = useState(false);
    const handleConfirmation = (event) => {
        const enteredConfirmation = event.target.value;
        setConfirmation(enteredConfirmation);
        setConfirmationMatches(enteredConfirmation === confirmationMatcher);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (typeof onSubmitExecute === 'function') {
            if (additionalParam !== undefined) {
                onSubmitExecute(additionalParam);
            } else {
                onSubmitExecute();
            }
        }
        if(typeof setShow === 'function'){
            setShow(false);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <Form.Group controlId="confirmationHint">
                    <Form.Text>
                        {hint}<em>{confirmationMatcher}</em>
                    </Form.Text>
                    <Form.Control style={{marginTop: '15px'}}
                                  type="text" value={confirmation}
                                  onChange={handleConfirmation}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" type="submit"
                        disabled={!confirmationMatches}>Submit</Button>
            </Modal.Footer>
        </Form>
    );
};

export default ConfirmationComponent;