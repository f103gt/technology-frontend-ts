import React from 'react';
import UserGuide from "./UserGuide";
import {IoMdAddCircle} from "react-icons/io";
import {FaTasks} from "react-icons/fa";

const AdminGuide = () => {
    const stepContent = [
        {
            action: 'Add Shifts Distribution',
            content: [
                {
                    subAction: null,
                    instructions: [
                        <span>Proceed to <strong>Navigation Bar {">"} Tasks <FaTasks/> </strong></span>,
                        <span>In the dropdown menu find the option <strong>"Distribute Shifts"</strong></span>,
                        'Upload a csv file with the shifts distribution and proceed with actions confirmation',
                        'ATTENTION! The csv file must contain columns with employee email and dates with working hours'
                    ]
                },
            ],
        },

        {
            action: 'Add New Employees Data',
            content: [
                {
                    subAction: null,
                    instructions: [
                        <span>Proceed to <strong>Navigation Bar {">"} Tasks <FaTasks/> </strong></span>,
                        <span>In the dropdown menu find the option <strong>"New Employees"</strong></span>,
                        'Upload a csv file with the new employees and proceed with actions confirmation',
                        'ATTENTION! The csv file must contain only column with the employee email and position.'
                    ]
                },
            ],
        }

    ];
    return (
        <UserGuide
            stepContent={stepContent}
            instructionsHeader={"Administrator Instructions"}/>
    );
};

export default AdminGuide;