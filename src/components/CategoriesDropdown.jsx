import React, {useCallback, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {RoleBasedComponent} from "../utilities/RoleBasedComponent";
import axios from "axios";
import {Dropdown} from 'react-bootstrap';
import {CgMenuRound} from "react-icons/cg";
import {RiDeleteBin5Fill} from "react-icons/ri";
import "../css/CategoriesDropdown.css"
import {MdAutoFixHigh} from "react-icons/md";
import {IoMdAddCircle} from "react-icons/io";

const CategoriesDropdown = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

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

    const setButtons = (roles) => {
        return (
            <RoleBasedComponent roles={roles}>
                <Link to={"/"} type="button" className="custom-button"><RiDeleteBin5Fill color={"orange"}/></Link>
                <span>&nbsp;</span>
                <Link to={"/"} type="button" className="custom-button"><MdAutoFixHigh color={"orange"}/></Link>
            </RoleBasedComponent>
        );
    }

    const setSingleButton = (roles) => {
        return (
            <div><RoleBasedComponent roles={roles}>
                <Link to={"/"} type="button" className="custom-button"><IoMdAddCircle color={"orange"}/>
                </Link>
            </RoleBasedComponent></div>
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
                                <Dropdown.Menu variant={"dark"} style={{ position: 'absolute', left: '100%', top: '0', width: '80%' }}>
                                    {category.childCategories.map((childCategory) => (
                                        <Dropdown.Item onClick={() => navigate(`/${childCategory.categoryName}`)}
                                        key = {childCategory.categoryName}>
                                            {childCategory.categoryName}
                                            {setButtons(["user", "admin", "manager", "staff"])}
                                        </Dropdown.Item>
                                    ))}
                                    {setSingleButton(["user", "admin", "manager", "staff"])}
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Dropdown.Item onClick={() => navigate(`/${category.categoryName}`)} key = {category.categoryName}>
                                {category.categoryName}
                            </Dropdown.Item>
                        )}
                        {setButtons(["user", "admin", "manager", "staff"])}
                    </React.Fragment>
                ))}
                {setSingleButton(["user", "admin", "manager", "staff"])}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default CategoriesDropdown;