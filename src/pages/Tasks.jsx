import React, {useState} from 'react';
import {Dropdown} from "react-bootstrap";
import NewEmployeesModal from "../modals/NewEmployeesModal";
import {FaTasks} from "react-icons/fa";
import "../css/NavBar.css"
import AddShiftsModal from "../modals/AddShiftsModal";

const Tasks = () => {
    const [show, setShow] = useState(false)
    const [addShiftsShow,setAddShiftsShow]=useState(false);
    //TODO include link for all the tasks that the employee must finish
    return (
        <div>
            <Dropdown id="subDropdownMenu" variant="dark" >
                <Dropdown.Toggle variant="dark" id={"tasksDropdown"} className={"text-white"}>Tasks
                    <FaTasks className={"icon"}/>
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                    <Dropdown.Item onClick={() => setAddShiftsShow(true)}>Distribute Shifts</Dropdown.Item>
                    <Dropdown.Item onClick={() => setShow(true)}>New Employees</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <AddShiftsModal show={addShiftsShow} setShow={setAddShiftsShow}></AddShiftsModal>
            <NewEmployeesModal show={show} setShow={setShow}/>
        </div>
    );
};

export default Tasks;