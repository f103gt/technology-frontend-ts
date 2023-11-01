import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import "../css/NavBar.css";
import {RoleBasedComponent} from "../utilities/RoleBasedComponent";
import CategoriesDropdown from "./CategoriesDropdown";
import CartModal from "../modals/CartModal";
import {Form, FormControl, Nav, Navbar} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FaTasks} from "react-icons/fa";
import {ImSearch} from "react-icons/im";
import {BiSolidLogInCircle} from "react-icons/bi";
import {RoleContext} from "../context/RoleProvider";
import {FaCircleUser} from "react-icons/fa6";
import {IoMdCart} from "react-icons/io";
import {RiHome6Fill} from "react-icons/ri";


const NavBar = () => {

    const [show, setShow] = useState(false);
    const {userRole} = useContext(RoleContext);
    const handleShow = () => setShow(true);

    const isLogged = () => {
        if (userRole === "guest")
            return (
                <Nav.Link as={Link} to="/login"><BiSolidLogInCircle size={"30"} color={"white"}/></Nav.Link>
            );
        if (userRole !== "guest") {
            return (
                <Button variant={"btn btn-link"} onClick={() => setShow(true)}>
                    <FaCircleUser size={"29"} color={"white"}/></Button>
            );
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
                        Navbar
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Item>
                                <Nav.Link as={Link} to="/home"><RiHome6Fill size={"30"} color={"white"}/></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <CategoriesDropdown/>
                            </Nav.Item>
                            <RoleBasedComponent roles={['staff', 'manager', 'admin', 'user']}>
                                <Nav.Item>
                                    <Nav.Link as={Link} to="/tasks"><FaTasks size={"25"} color={"white"}/></Nav.Link>
                                </Nav.Item>
                            </RoleBasedComponent>
                        </Nav>
                        <Form className="d-flex">
                            <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search"/>
                            <Button variant="outline-success dark" type="submit"><ImSearch size={"20"}
                                                                                           color={"white"}/></Button>
                        </Form>
                        <div>
                            <Nav className="ms-2 me-auto">
                                <Nav.Item>
                                    {isLogged()}
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onClick={handleShow}> <IoMdCart size={"30"}
                                                                                    color={"white"}/></Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                    </Navbar.Collapse>
                </div>
            </Navbar>
            <CartModal show={show} setShow={setShow}/>
        </div>
    );
};
export default NavBar;
