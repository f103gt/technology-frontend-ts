import React, {useEffect, useMemo, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "../css/NavBar.css"
import {RoleBasedComponent} from "../utilities/RoleBasedComponent";

interface Category {
    categoryName: string;
    childCategories: Category[];
}

const NavBar = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
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
    }, []);

    const setButtons = (roles:any) => {
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

    const setSingleButton = (roles: any) => {
        return (
            <RoleBasedComponent roles={roles}>
                <button
                    type="button"
                    className="btn btn-info btn-sm"
                    style={{
                        padding: '.25rem .5rem',
                        fontSize: '.75rem',
                    }}>Add</button>
            </RoleBasedComponent>
        );
    };

    const renderCategories = useMemo(() => {
        return (
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
                {setSingleButton(["user", "admin", "manager", "staff"])}
            </ul>
        );
    }, [categories, navigate]);


    /* const usernameDisplay = username ?
         (<li className="nav-item">
             <Link className="nav-link" to="/logout">{username}</Link>
         </li>)
         :
         (<li className="nav-item">
             <Link className="nav-link" to="/login">Login</Link>
         </li>);*/

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/home">Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="nav-link dropdown-toggle"
                                        data-bs-auto-close="outside"
                                        id="navbarDropdown" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                    Products
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {renderCategories}
                                </ul>
                            </li>
                            <RoleBasedComponent roles={["staff", "manager", "admin", "user"]}>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/tasks">Tasks</Link>
                                </li>
                            </RoleBasedComponent>
                        </ul>
                        <form className="d-flex">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>
                        <div>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {/*{usernameDisplay}*/}
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/cart">Cart</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};
export default NavBar;