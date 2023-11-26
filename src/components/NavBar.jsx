import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import "../css/NavBar.css";
import {RoleBasedComponent} from "../utilities/RoleBasedComponent";
import CategoriesDropdown from "./CategoriesDropdown";
import CartModal from "../modals/CartModal";
import {Nav, Navbar} from "react-bootstrap";
import {FaTasks} from "react-icons/fa";
import {BiSolidLogInCircle} from "react-icons/bi";
import {RoleContext} from "../context/RoleProvider";
import {FaCircleUser} from "react-icons/fa6";
import {IoMdCart} from "react-icons/io";
import {RiHome6Fill} from "react-icons/ri";
import AuthenticationModal from "../modals/AuthenticationModal";
import Tasks from "../pages/Tasks";
import AccountModal from "../modals/AccountModal";


const NavBar = () => {
    const {userRole} = useContext(RoleContext);
    const [showCart, setShowCart] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const [showAccount, setShowAccount] = useState(false);

    const isLogged = () => {
        if (userRole === "guest") {
            return (
                <Nav.Link onClick={() => setShowAuth(true)}
                          className={"text-white"}>Login
                    <BiSolidLogInCircle className={"icon"} size={"23"}/>
                    </Nav.Link>
            );
        }
        if (userRole !== "guest") {
            return (
                <Nav.Link onClick={() => setShowAccount(true)}
                          className={"text-white"}
                >Account
                    <FaCircleUser className={"icon"} size={"21"}/></Nav.Link>
            );
        }
    }

    const tasksDisplay = () => {
        if (userRole === "admin") {
            return (<Tasks/>);
        } else {
            return (
                <RoleBasedComponent roles={['staff']}>
                    <Nav.Link as={Link} to={"/todo"} className="text-white">Tasks
                        <FaTasks className={"icon"}/></Nav.Link>
                </RoleBasedComponent>);
        }
    }


    //TODO implement formatting for /categoryName url
    // if the url is represented with only one word- make all the letter lower case
    // if the url has multiple parts make them look like represented below
    // smartphone and mobile-phone

    return (
        <div>
            <Navbar expand="lg" bg="dark" variant="dark">
                <div className="container">
                    <Navbar.Brand as={Link} to="/">
                        TECHNOLOGY
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-center">
                        <Nav>
                            <Nav.Item className={"nav-item"}>
                                <Nav.Link as={Link} to="/home" className="text-white">Home
                                    <RiHome6Fill className={"icon"} size={"21"}/>
                                </Nav.Link>
                            </Nav.Item>
                                <CategoriesDropdown/>
                            <RoleBasedComponent roles={['staff', 'manager', 'admin', 'user']}>
                                <Nav.Item>{tasksDisplay()}</Nav.Item>
                            </RoleBasedComponent>
                            <Nav.Item>
                                {isLogged()}
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={() => setShowCart(true)}
                                          className="text-white">Cart
                                    <IoMdCart className={"icon"} size={"22"}/></Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
            <CartModal show={showCart} setShow={setShowCart}/>
            <AuthenticationModal show={showAuth} setShow={setShowAuth}/>
            <AccountModal show={showAccount} setShow={setShowAccount}/>
        </div>
    );
};
export default NavBar;
