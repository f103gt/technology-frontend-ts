import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {RoleBasedComponent} from "../utilities/RoleBasedComponent";
import axios from "axios";
import {Dropdown} from 'react-bootstrap';
import {CgMenuRound} from "react-icons/cg";
import {RiDeleteBin5Fill} from "react-icons/ri";
import {IoMdAddCircle} from "react-icons/io";
import Button from "react-bootstrap/Button";
import CategoryInputField from "./CategoryInputField";
import {MdAutoFixHigh} from "react-icons/md";

const CategoriesDropdown = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("");

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
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            })
            .catch(error => {
                console.error('Error fetching CSRF token:', error);
            });
    }, [setCategories]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);


    const showInput = (categoryName) => {
        if (!activeCategory) {
            return (
                <RoleBasedComponent roles={["user", "admin", "manager", "staff"]}>
                    <Button variant="btn btn-link" type="button" className="custom-button"
                            onClick={() => {
                                setActiveCategory(categoryName)
                            }}>
                        < IoMdAddCircle color="white"/>
                    </Button>
                </RoleBasedComponent>
            );
        } else if (activeCategory === categoryName) {
            return (
                <RoleBasedComponent roles={["user", "admin", "manager", "staff"]}>
                    <CategoryInputField parentCategoryName={categoryName}
                                        setActiveCategory={setActiveCategory}/>
                </RoleBasedComponent>
            );
        }
    }

    if (isLoading) {
        return (
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                <CgMenuRound size={30}/>
            </Dropdown.Toggle>
        );
    }

    return (
        <div>
            <Dropdown id="mainDropdownMenu">
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    <CgMenuRound size={30}/>
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                    {categories.map(category => (
                        <React.Fragment key={category.categoryName}>
                            {category.childCategories.length > 0 ? (
                                <Dropdown id="subDropdownMenu" variant="dark">
                                    <Dropdown.Toggle variant="dark" id={`dropdown-submenu-${category.categoryName}`}>
                                        {category.categoryName}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu variant="dark"
                                                   style={{position: 'absolute', left: '100%', top: '0', width: '80%'}}>
                                        {category.childCategories.map((childCategory) => (
                                            <Dropdown.Item onClick={() => navigate(`/${childCategory.categoryName}`)}
                                                           key={childCategory.categoryName}>
                                                {childCategory.categoryName}
                                                <RoleBasedComponent roles={["user", "admin", "manager", "staff"]}>
                                                    <Button variant="btn btn-link" type="button"
                                                            className="custom-button">
                                                        <RiDeleteBin5Fill color="white"/>
                                                    </Button>
                                                </RoleBasedComponent>
                                                <RoleBasedComponent roles={["user", "admin", "manager", "staff"]}>
                                                    <Button variant="btn btn-link" type="button"
                                                            className="custom-button">
                                                        <MdAutoFixHigh color="white"/>
                                                    </Button>
                                                </RoleBasedComponent>
                                            </Dropdown.Item>
                                        ))}
                                        {showInput(category.categoryName)}
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                <Dropdown.Item onClick={() => navigate(`/${category.categoryName}`)}
                                               key={category.categoryName}>
                                    {category.categoryName}
                                </Dropdown.Item>
                            )}
                            <RoleBasedComponent roles={["user", "admin", "manager", "staff"]}>
                                <Button variant="btn btn-link" type="button" className="custom-button">
                                    <RiDeleteBin5Fill color="white"/>
                                </Button>
                            </RoleBasedComponent>
                            <RoleBasedComponent roles={["user", "admin", "manager", "staff"]}>
                                <Button variant="btn btn-link" type="button" className="custom-button">
                                    <MdAutoFixHigh color="white"/>
                                </Button>
                            </RoleBasedComponent>
                            {showInput(category.categoryName)}
                        </React.Fragment>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default CategoriesDropdown;
