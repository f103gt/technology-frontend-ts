import React, {useState} from 'react';
import {Form, ListGroup} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import ConfirmationModal from "../../modals/ConfirmationModal";
import axios from "axios";

const ToDoCard = ({uuid,url}) => {
    const [completed, setCompleted] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();
    const changeOrderStatus=()=>{
        axios.get('/csrf/api/v1')
            .then(csrfResponse => {
                const csrfToken = csrfResponse.data.headers;
                axios({
                    method: 'patch',
                    url: url,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    }
                })
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        navigate("/error");
                    })
            })
            .catch(error => {
                navigate("/error");
            });
    }


    const handleCompletion = () => {
        setCompleted(true);
        setShowConfirmation(true);
    }

    return (
        <div>
            <ListGroup.Item className="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                            style={{backgroundColor: '#f4f6f7'}}>
                <Form.Check className="form-check-input me-2" type="checkbox"
                            onClick={handleCompletion}
                            value="" checked={completed}/>
                {
                    completed ?
                        <Link to={`/todo/${uuid}`}><s>Order №{uuid}</s></Link>
                        : <Link to={`/todo/${uuid}`}>Order №{uuid}</Link>
                }
            </ListGroup.Item>
            <ConfirmationModal
                uuid={uuid}
                show={showConfirmation}
                setShow={setShowConfirmation}
                onSubmitExecute={changeOrderStatus}/>
        </div>
    );
};

export default ToDoCard;