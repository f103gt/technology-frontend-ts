import React from 'react';
import UserGuide from "./UserGuide";
import {FaTasks} from "react-icons/fa";

const StaffGuide = () => {

    const stepContent = [
        {
            action: 'Order Management',
            content: [
                {
                    subAction: null,
                    instructions: [
                        <span>Proceed to <strong>Navigation Bar {">"} Tasks <FaTasks/> </strong></span>,
                        'In the check list find the necessary order status and update it if necessary',
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
        <div>
            <UserGuide
                stepContent={stepContent}
                instructionsHeader={"Staff Instructions"}/>
        </div>
    );
};

export default StaffGuide;