import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {RoleBasedComponent} from "../utilities/RoleBasedComponent";
import axios from "axios";
import {Dropdown} from 'react-bootstrap';
import {CgMenuRound} from "react-icons/cg";
import {RiDeleteBin5Fill} from "react-icons/ri";
import "../css/CategoriesDropdown.css"
import {MdAutoFixHigh} from "react-icons/md";
import {IoMdAddCircle} from "react-icons/io";
import Button from "react-bootstrap/Button";
import AddProductModal from "./AddProductModal";

const CategoriesDropdown = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [show,setShow] = useState(false);

    const fetchCategories = useCallback(() => {
        axios.get('/csrf/api/v1')
            .then(csrfResponse => {
                const csrfToken = csrfResponse.data.headers;
                axios.get('/api/v1/all-categories', {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    }
                })
                    .then(categoriesResponse => {
                        setCategories(categoriesResponse.data);
                    })
                    .catch(error => {
                        console.error('Error fetching categories:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching CSRF token:', error);
            });
    }, [setCategories]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const setButton = (roles, IconComponent, className, color) => {
        return (
            <RoleBasedComponent roles={roles}>
                <Button variant={"btn btn-link"} type="button" className={className}
                onClick = {()=>setShow(true)}><IconComponent
                    color={color}/></Button>
            </RoleBasedComponent>
        );
    };
    return (
        <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic"><CgMenuRound size={"30"}/></Dropdown.Toggle>

            <Dropdown.Menu variant={"dark"}>
                {categories.map(category => (
                    <React.Fragment key={category.categoryName}>
                        {category.childCategories.length > 0 ? (
                            <Dropdown variant={"dark "}>
                                <Dropdown.Toggle variant="dark" id={`dropdown-submenu-${category.categoryName}`}>
                                    {category.categoryName}
                                </Dropdown.Toggle>
                                <Dropdown.Menu variant={"dark"}
                                               style={{position: 'absolute', left: '100%', top: '0', width: '80%'}}>
                                    {category.childCategories.map((childCategory) => (
                                        <Dropdown.Item onClick={() => navigate(`/${childCategory.categoryName}`)}
                                                       key={childCategory.categoryName}>
                                            {childCategory.categoryName}
                                            {setButton(["user", "admin", "manager", "staff"], RiDeleteBin5Fill, "custom-button", "orange")}
                                            {setButton(["user", "admin", "manager", "staff"], MdAutoFixHigh, "custom-button", "orange")}
                                        </Dropdown.Item>
                                    ))}
                                    {setButton(["user", "admin", "manager", "staff"], IoMdAddCircle, "custom-button", "orange")}
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Dropdown.Item onClick={() => navigate(`/${category.categoryName}`)}
                                           key={category.categoryName}>
                                {category.categoryName}
                            </Dropdown.Item>
                        )}
                        {setButton(["user", "admin", "manager", "staff"], RiDeleteBin5Fill, "custom-button", "orange")}
                        {setButton(["user", "admin", "manager", "staff"], MdAutoFixHigh, "custom-button", "orange")}
                    </React.Fragment>
                ))}
                {setButton(["user", "admin", "manager", "staff"], IoMdAddCircle, "custom-button", "orange")}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default CategoriesDropdown;