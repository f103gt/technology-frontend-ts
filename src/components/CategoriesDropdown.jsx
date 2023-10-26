import React, {useCallback, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {RoleBasedComponent} from "../utilities/RoleBasedComponent";
import axios from "axios";

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
                <button type="button" className="btn btn-info btn-sm"
                        style={{
                            padding: '.25rem .5rem',
                            fontSize: '.75rem',
                        }}>Delete
                </button>
                <span>&nbsp;</span>
                <button type="button" className="btn btn-info btn-sm"
                        style={{
                            padding: '.25rem .5rem',
                            fontSize: '.75rem',
                        }}>Modify
                </button>
            </RoleBasedComponent>
        );
    }

    const setSingleButton = (roles) => {
        return (
            <RoleBasedComponent roles={roles}>
                <button
                    type="button"
                    className="btn btn-info btn-sm"
                    style={{
                        padding: '.25rem .5rem',
                        fontSize: '.75rem',
                    }}>Add
                </button>
            </RoleBasedComponent>
        );
    };
    return (
        <div>
            <ul>
                {categories.map(category => {
                    if (category.childCategories.length > 0) {
                        return (
                            <li className="dropend" key={category.categoryName}>
                                <Link to={`/${category.categoryName}`} className="dropdown-item dropdown-toggle"
                                      role="button"
                                      data-bs-toggle="dropdown" id="sub-dropdown-menu"
                                      data-bs-auto-close="outside">
                                    {category.categoryName}
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="sub-dropdown-menu">
                                    {category.childCategories.map(childCategory => (
                                        <li key={childCategory.categoryName}>
                                            <button className="dropdown-item"
                                                    onClick={() => navigate(`/${childCategory.categoryName}`)}>
                                                {childCategory.categoryName}
                                            </button>
                                            {setButtons(["user", "admin", "manager", "staff"])}
                                        </li>
                                    ))}
                                    {setSingleButton(["user", "admin", "manager", "staff"])}
                                </ul>
                            </li>
                        );
                    } else {
                        return (
                            <li key={category.categoryName}>
                                <button className="dropdown-item"
                                        onClick={() => navigate(`/${category.categoryName}`)}>
                                    {category.categoryName}
                                </button>
                                {setButtons(["user", "admin", "manager", "staff"])}
                            </li>
                        );
                    }
                })}

            </ul>
        </div>
    );
};

export default CategoriesDropdown;