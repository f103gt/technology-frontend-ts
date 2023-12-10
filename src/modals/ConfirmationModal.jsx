import React from 'react';
import Modal from "react-bootstrap/Modal";
import OneFieldConfirmation from "../components/OneFieldConfirmation";

const ConfirmationModal = ({uuid, show, setShow, onSubmitExecute}) => {
    const hint = "To confirm order status change enter the order uuid ";

    return (
        <Modal show={show} onHide={() => setShow(false)}
               backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Order Status Changing</Modal.Title>
            </Modal.Header>
            <OneFieldConfirmation hint={hint}
                                   confirmationMatcher={uuid}
                                   onSubmitExecute={onSubmitExecute}
                                   setShow={setShow}/>
        </Modal>
    );
};

export default ConfirmationModal;


//TODO UNIFY CONFIRMATION
