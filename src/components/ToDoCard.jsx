import React, {useState} from 'react';
import {Form, ListGroup} from "react-bootstrap";

const ToDoCard = ({order}) => {
    const [completed, setCompleted] = useState(false);
    const handleCompletion = () => {
        return !completed ? setCompleted(true) : setCompleted(false);
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
                        <s>order.uniqueIdentifier</s>
                        :<>order.uniqueIdentifier</>
                }
            </ListGroup.Item>
        </div>
    );
};

export default ToDoCard;