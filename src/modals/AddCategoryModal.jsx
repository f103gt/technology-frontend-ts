import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import ConfirmationComponent from "../components/ConfirmationComponent";
import {communicateWithServer} from "../utilities/ServerCommunication";
import {useModalCloseOnSuccess} from "../utilities/useModalCloseOnSuccess";

const AddCategoryModal = ({show, setShow, parentCategoryName}) => {
    const [categoryName, setCategoryName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successResponse, setSuccessResponse] = useState(false);
    const {isReadyToClose} = useModalCloseOnSuccess(show, setShow, successResponse);

    const handleError = (error) => {
        setErrorMessage(error.message || error);
    }
    const handleSuccessResponse = () => {
        setSuccessResponse(true);
    }
    const handleSubmit = () => {
        const requestBody = {
            parentCategoryName: parentCategoryName,
            categoryName: categoryName
        }

        communicateWithServer({
            url: "/manager/add-category",
            method: "post",
            data: requestBody,
            headers: {'Content-Type': 'application/json'},
            handleError: handleError,
            executeFunction: handleSuccessResponse,
            executeFunctionArgs: [setSuccessResponse],
            reload:true
        })
    }

    const handleClose = () => {
        setShow(false);
        setErrorMessage("");
    }
    return (
        <Modal show={show} onHide={handleClose}
               onExit={() => {
                   setCategoryName("");
               }}>
            <Modal.Header closeButton>
                <Modal.Title>New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && <p style={{color: "#8b0000"}}>{errorMessage}</p>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="productName">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control type="text" value={categoryName} onChange={e => setCategoryName(e.target.value)}/>
                    </Form.Group>
                </Form>
                <ConfirmationComponent confirmationMatcher={"addCategory"}
                                       hint={"To confirm insertion of a new category enter "}
                                       setShow={setShow}
                                       onSubmitExecute={handleSubmit}/>
            </Modal.Body>
        </Modal>
    );
};

export default AddCategoryModal;

/*axios.get("/csrf/api/v1")
            .then(response => {
                const csrfToken = response.data.headers;
                axios({
                    method: 'post',
                    url: "/manager/add-category",
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
            });*/