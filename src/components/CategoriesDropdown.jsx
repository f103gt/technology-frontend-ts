import React, {useCallback, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {RoleBasedComponent} from "../utilities/RoleBasedComponent";
import axios from "axios";
import {Dropdown, DropdownButton} from 'react-bootstrap';
import Button from "react-bootstrap/Button";

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
            <div><RoleBasedComponent roles={roles}>
                <Button type="button" className="btn btn-info btn-sm"
                        style={{
                            padding: '.25rem .5rem',
                            fontSize: '.75rem',
                        }}>Delete
                </Button>
                <span>&nbsp;</span>
                <button type="button" className="btn btn-info btn-sm"
                        style={{
                            padding: '.25rem .5rem',
                            fontSize: '.75rem',
                        }}>Modify
                </button>
            </RoleBasedComponent></div>
        );
    }

    const setSingleButton = (roles) => {
        return (
            <div><RoleBasedComponent roles={roles}>
                <button
                    type="button"
                    className="btn btn-info btn-sm"
                    style={{
                        padding: '.25rem .5rem',
                        fontSize: '.75rem',
                    }}>Add
                </button>
            </RoleBasedComponent></div>
        );
    };
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Categories
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {categories.map(category => (
                    <React.Fragment key={category.categoryName}>
                        {category.childCategories.length > 0 ? (
                            <Dropdown>
                                <Dropdown.Toggle variant="light" id={`dropdown-submenu-${category.categoryName}`}>
                                    {category.categoryName}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
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