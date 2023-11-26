import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const ConfirmationComponent = ({
                                   hint, confirmationMatcher,
                                   onSubmitExecute,
                                   setShow
                               }) => {
    const [confirmation, setConfirmation] = useState("");
    const [confirmationMatches, setConfirmationMatches] = useState(false);
    const handleConfirmation = (event) => {
        const enteredConfirmation = event.target.value;
        setConfirmation(enteredConfirmation);
        setConfirmationMatches(enteredConfirmation === confirmationMatcher);
    };

    return (
        <Form onSubmit={(e) => {
            e.preventDefault();
            onSubmitExecute();
            setShow(false);
        }}>
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