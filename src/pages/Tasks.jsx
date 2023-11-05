import React, {useState} from 'react';
import {Dropdown} from "react-bootstrap";
import NewEmployeesModal from "../modals/NewEmployeesModal";
import {FaTasks} from "react-icons/fa";

const Tasks = () => {
    const [show, setShow] = useState(false);
    //TODO include link for all the tasks that the employee must finish
    return (
        <div>
            <Dropdown id="subDropdownMenu" variant="dark">
                <Dropdown.Toggle variant="dark" id={"tasksDropdown"}>
                    <FaTasks size={"25"} color={"white"}/>
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                    <Dropdown.Item>ToDo</Dropdown.Item>
                    <Dropdown.Item onClick={() => setShow(true)}>New Data</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <NewEmployeesModal show={show} setShow={setShow}/>
        </div>
    );
};

export default Tasks;