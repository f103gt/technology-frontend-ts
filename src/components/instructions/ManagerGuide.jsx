import React from 'react';
import {CgMenuRound} from "react-icons/cg";
import {RxTriangleDown} from "react-icons/rx";
import {IoMdAddCircle} from "react-icons/io";
import {LuPlusCircle} from "react-icons/lu";
import {RiDeleteBin5Fill} from "react-icons/ri";
import {MdAutoFixHigh} from "react-icons/md";
import UserGuide from "./UserGuide";

const ManagerGuide = () => {

    const stepContent = [
        {
            action: 'Add new product category',
            content: [
                {
                    subAction: 'Add a New Main Category',
                    instructions: [
                        <span>Proceed to <strong>Navigation Bar {">"} Products <CgMenuRound/> <RxTriangleDown/></strong></span>,
                        <span>Find the <strong><IoMdAddCircle/> button</strong> at the bottom of the dropdown menu and click it.</span>,
                        <span>Enter the <strong>name of a new main category</strong> in the form "Add New Category".</span>,
                        'Confirm your actions to make sure that any alternations are done deliberately.'
                    ]
                },
                {
                    subAction: 'Add a New Subcategory',
                    instructions: [
                        <span>Proceed to <strong>Navigation Bar {">"} Products <CgMenuRound/> <RxTriangleDown/></strong></span>,
                        'In the products dropdown, find the main category of the desired subcategory.',
                        <span>Press <strong><LuPlusCircle/> button</strong> right nex to the main category name</span>,
                        <span>Enter the <strong>name of a new subcategory</strong> in the form "Add New Category"</span>,
                        'Confirm your actions to make sure that any alternations are done deliberately.'
                    ]
                },
            ],
        },

        {
            action: 'Delete an existing product category',
            content: [
                {
                    subAction: 'Delete a Main Category',
                    instructions: [
                        <span>Proceed to <strong>Navigation Bar {">"} Products <CgMenuRound/> <RxTriangleDown/></strong></span>,
                        'Find the category you want to delete.',
                        <span>Look for the <strong><RiDeleteBin5Fill/> option</strong> from the right of the category.'</span>,
                        'Confirm your actions by performing the required steps provide in the confirmation form.',
                        'ATTENTION! Along with the deleted main category, all the sub categories and their products will be also removed'
                    ]
                },
                {
                    subAction: 'Delete a Subcategory',
                    instructions: [
                        <span>Proceed to <strong>Navigation Bar {">"} Products <CgMenuRound/> <RxTriangleDown/></strong></span>,
                        'Click the main category of the sub category you want to delete.',
                        'Find the desired subcategory.',
                        <span>Look for the <strong><RiDeleteBin5Fill/> option</strong> from the right of the category.'</span>,
                        'Confirm your actions by performing the required steps provide in the confirmation form.',
                        'ATTENTION! Along with the deleted sub category, all the products will be also removed'
                    ]
                },
            ],
        },

        {
            action: 'Modify an existing product category',
            content: [
                {
                    subAction: 'Modify a Main Category',
                    instructions: [
                        <span>Proceed to <strong>Navigation Bar {">"} Products <CgMenuRound/> <RxTriangleDown/></strong></span>,
                        'Find the main category you want to modify.',
                        <span>Look for the <strong><MdAutoFixHigh/> option</strong> from the right of the category.'</span>,
                        <span>Enter a <strong> new name of the main category</strong> in the "Modify Main Category" form.</span>,
                        'Confirm your actions to make sure that any alternations are done deliberately.'
                    ]
                },
                {
                    subAction: 'Modify a Subcategory',
                    instructions: [
                        <span>Proceed to <strong>Navigation Bar {">"} Products <CgMenuRound/> <RxTriangleDown/></strong></span>,
                        'Click the main category of the sub category you want to delete.',
                        'Find the desired subcategory.',
                        <span>Look for the <strong><MdAutoFixHigh/> option</strong> from the right of the category.'</span>,
                        <span>Enter a <strong> new name of the sub category</strong> in the "Modify Sub Category" form.</span>,
                        'Confirm your actions to make sure that any alternations are done deliberately.'
                    ]
                },
            ],
        },


        {
            action: 'Add a New Product',
            content: [
                {
                    subAction: null,
                    instructions: [
                        <span>Proceed to <strong>Navigation Bar {">"} Products <CgMenuRound/> <RxTriangleDown/></strong></span>,
                        'Find the category of the product you want to add.',
                        'Navigate the desired products category page and scroll down to the bottom of the page.',
                        <span>Find the <strong><IoMdAddCircle/> button</strong> at the bottom of the page and click it.</span>,
                        'Fill in the "Add New Product" form.'
                    ]
                },
            ],
        },

        {
            action: 'Delete a Product',
            content: [
                {
                    subAction: null,
                    instructions: [
                        <span>Proceed to <strong>Navigation Bar {">"} Products <CgMenuRound/> <RxTriangleDown/></strong></span>,
                        'Find the category of the product you want to delete.',
                        'Navigate the desired products category page and find the product.',
                        <span>Press the <strong><RiDeleteBin5Fill/> button</strong> at the bottom of the product card.</span>,
                        'Confirm your actions to make sure that any alternations are done deliberately.'
                    ]
                },
            ],
        },

        {
            action: 'Modify the Product Information',
            content: [
                {
                    subAction: null,
                    instructions: [
                        <span>Proceed to <strong>Navigation Bar {">"} Products <CgMenuRound/> <RxTriangleDown/></strong></span>,
                        'Find the category of the product you want to delete.',
                        'Navigate the desired products category page and find the product.',
                        <span>Press the <strong><MdAutoFixHigh/> button</strong> at the bottom of the product card.</span>,
                        'Fill in the "Modify Product Information" form.'
                    ]
                },
            ],
        },

    ];
    return (
        <UserGuide
            stepContent={stepContent}
            instructionsHeader={"Manager Instructions"}/>
    );
};

export default ManagerGuide;