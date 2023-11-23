import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {RoleBasedComponent} from "../utilities/RoleBasedComponent";
import axios from "axios";
import {Dropdown} from 'react-bootstrap';
import {CgMenuRound} from "react-icons/cg";
import {RiDeleteBin5Fill} from "react-icons/ri";
import Button from "react-bootstrap/Button";
import {MdAutoFixHigh} from "react-icons/md";
import "../css/NavBar.css"
import AddCategoryModal from "../modals/AddCategoryModal";
import {IoMdAddCircle} from "react-icons/io";

const CategoriesDropdown = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    /*const [activeCategory, setActiveCategory] = useState("");*/
    const [showAdd, setShowAdd] = useState(false);
    const [parentCategory,setParentCategory] = useState("");

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


    /* const showInput = (categoryName) => {
         if (!activeCategory) {
             return (
                 <RoleBasedComponent roles={["user", "admin", "manager", "staff"]}>
                     <Button variant="btn btn-link" type="button" className="custom-button"
                             onClick={() => {setShowAdd(true)}}>
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
     }*/

    if (isLoading) {
        return (
            <Dropdown.Toggle variant="dark" id="dropdown-basic"> Products
                <CgMenuRound className={"icon"} size={"23"}/>
            </Dropdown.Toggle>
        );
    }

    return (
        <div>
            <Dropdown id="mainDropdownMenu">
                <Dropdown.Toggle variant="dark" id="dropdown-basic">Products
                    <CgMenuRound  size={"23"} className={"icon"}/>
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                    {categories.map(category => (
                        <React.Fragment key={category.categoryName}>
                            {category.childCategories.length > 0 ? (
                                <Dropdown id="subDropdownMenu" variant="dark">
                                    <Dropdown.Toggle variant="dark" style={{backgroundColor: '#212529'}}
                                                     id={`dropdown-submenu-${category.categoryName}`}>
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
                                        <RoleBasedComponent roles={["user", "admin", "manager", "staff"]}>
                                            <Button variant="btn btn-link" type="button" className="custom-button"
                                                    onClick={() => {setShowAdd(true);
                                                    setParentCategory(category.categoryName)}}>
                                                <IoMdAddCircle color="white"/>
                                            </Button>
                                        </RoleBasedComponent>
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
                        </React.Fragment>
                    ))}
                    <RoleBasedComponent roles={["user", "admin", "manager", "staff"]}>
                        <Button variant="btn btn-link" type="button" className="custom-button"
                                onClick={() => {
                                    setShowAdd(true)
                                }}>
                            <IoMdAddCircle color="white"/>
                        </Button>
                    </RoleBasedComponent>
                </Dropdown.Menu>
            </Dropdown>
            <AddCategoryModal parentCategoryName={parentCategory} setShow={setShowAdd} show={showAdd}/>
        </div>
    );
};

export default CategoriesDropdown;
