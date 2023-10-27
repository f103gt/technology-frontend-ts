import React, {useState} from 'react';
import {Link} from "react-router-dom";
import "../css/NavBar.css"
import {RoleBasedComponent} from "../utilities/RoleBasedComponent";
import CategoriesDropdown from "./CategoriesDropdown";
import CartModal from "./CartModal";
import {Form, FormControl, Nav, Navbar} from "react-bootstrap";
import Button from "react-bootstrap/Button";


const NavBar = () => {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

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
            <Navbar expand="lg" bg="light">
                <div className="container">
                    <Navbar.Brand as={Link} to="/">
                        Navbar
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Item>
                                <Nav.Link as={Link} to="/home">
                                    Home
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <CategoriesDropdown/>
                            </Nav.Item>
                            <RoleBasedComponent roles={['staff', 'manager', 'admin', 'user']}>
                                <Nav.Item>
                                    <Nav.Link as={Link} to="/tasks">
                                        Tasks
                                    </Nav.Link>
                                </Nav.Item>
                            </RoleBasedComponent>
                        </Nav>
                        <Form className="d-flex">
                            <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search"/>
                            <Button variant="outline-success" type="submit">
                                Search
                            </Button>
                        </Form>
                        <div>
                            <Nav className="ms-2 me-auto">
                                <Nav.Item>
                                    <Nav.Link as={Link} to="/login">
                                        Login
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Button variant="link" onClick={handleShow}>
                                        Cart
                                    </Button>
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