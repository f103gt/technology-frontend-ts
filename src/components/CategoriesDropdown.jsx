import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {RoleBasedComponent} from "../utilities/RoleBasedComponent";
import axios from "axios";
import {Dropdown, Nav} from 'react-bootstrap';
import {CgMenuRound} from "react-icons/cg";
import {RiDeleteBin5Fill} from "react-icons/ri";
import Button from "react-bootstrap/Button";
import {MdAutoFixHigh} from "react-icons/md";
import "../css/NavBar.css"
import AddCategoryModal from "../modals/AddCategoryModal";
import {IoMdAddCircle} from "react-icons/io";
import {LuPlusCircle} from "react-icons/lu";
import "../css/CategoriesDropdonw.css";
import {RxTriangleDown} from "react-icons/rx";

const CategoriesDropdown = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [showAdd, setShowAdd] = useState(false);
    const [parentCategory, setParentCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    
    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(selectedCategory === categoryName ? null : categoryName);
    };
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
                navigate("/error");
            });
    }, [navigate]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);


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
                    <CgMenuRound size={"23"} className={"icon"}/>
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark"
                               style={{
                                   backgroundColor: '#212529',
                                   borderColor: '#212529',
                                   top: '40px'
                               }}>
                    {categories.map(category => (
                        <React.Fragment key={category.categoryName}>
                            <Dropdown.Item
                                onClick={(event) => {
                                    if (category.childCategories.length === 0) {
                                        navigate(`/${category.categoryName}`);
                                    } else {
                                        event.stopPropagation();
                                        handleCategoryClick(category.categoryName);
                                    }
                                }}
                                key={category.categoryName}>
                                {category.childCategories.length > 0 ?
                                    <>{category.categoryName} <RxTriangleDown color={"white"}/></>
                                    : category.categoryName
                                }
                                <RoleBasedComponent roles={["manager"]} style={{marginRight: '0px'}}>
                                    <Button variant="btn btn-link" type="button"
                                            className="custom-button"
                                            onClick={(event) => {
                                                setShowAdd(true);
                                                event.stopPropagation();
                                            }}>
                                        <LuPlusCircle color="white"/>
                                    </Button>
                                </RoleBasedComponent>
                                <RoleBasedComponent roles={["manager"]}>
                                    <Button variant="btn btn-link" type="button" className="custom-button">
                                        <RiDeleteBin5Fill color="white"/>
                                    </Button>
                                </RoleBasedComponent>
                                <RoleBasedComponent roles={["manager"]}>
                                    <Button variant="btn btn-link" type="button" className="custom-button">
                                        <MdAutoFixHigh color="white"/>
                                    </Button>
                                </RoleBasedComponent>
                            </Dropdown.Item>
                            {selectedCategory &&
                                category.childCategories.length > 0
                                && category.childCategories.map((childCategory) => (
                                    <Dropdown.Item onClick={() => navigate(`/${childCategory.categoryName}`)}
                                                   key={childCategory.categoryName}>
                                        {"\t" + childCategory.categoryName}
                                        <RoleBasedComponent roles={["manager"]}>
                                            <Button variant="btn btn-link" type="button"
                                                    className="custom-button"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                    }}>
                                                <RiDeleteBin5Fill color="white"/>
                                            </Button>
                                        </RoleBasedComponent>
                                        <RoleBasedComponent roles={["manager"]}>
                                            <Button variant="btn btn-link" type="button"
                                                    className="custom-button"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                    }}>
                                                <MdAutoFixHigh color="white"/>
                                            </Button>
                                        </RoleBasedComponent>
                                    </Dropdown.Item>
                                ))}
                        </React.Fragment>
                    ))}
                    <RoleBasedComponent roles={["manager"]}>
                        <Button variant="btn btn-link" type="button" className="custom-button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setShowAdd(true);
                                }}>
                            <IoMdAddCircle size="23" color="white"/>
                        </Button>
                    </RoleBasedComponent>
                </Dropdown.Menu>
            </Dropdown>
            <AddCategoryModal parentCategoryName={parentCategory} setShow={setShowAdd} show={showAdd}/>
        </div>
    )
        ;
};

export default CategoriesDropdown;


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