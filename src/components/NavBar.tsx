import React from 'react';
import {Link} from "react-router-dom";
import "../css/NavBar.css"
import {RoleBasedComponent} from "../utilities/RoleBasedComponent";
import CategoriesDropdown from "./CategoriesDropdown";


const NavBar = () => {

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
                                    <CategoriesDropdown/>
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