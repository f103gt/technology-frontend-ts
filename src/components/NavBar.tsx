import React, {useState} from 'react';
import {Link} from "react-router-dom";
import "../css/NavBar.css"
import {RoleBasedComponent} from "../utilities/RoleBasedComponent";
import CategoriesDropdown from "./CategoriesDropdown";
import CartModal from "./CartModal";
import {Form, FormControl, Nav, Navbar} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FaShoppingCart, FaTasks} from "react-icons/fa";
import {HiHome} from "react-icons/hi";
import {ImSearch} from "react-icons/im";
import {BiSolidLogInCircle} from "react-icons/bi";


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
            <Navbar expand="lg" bg="dark" variant="dark">
                <div className="container">
                    <Navbar.Brand as={Link} to="/">
                        Navbar
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Item>
                                <Nav.Link as={Link} to="/home"><HiHome size={"25"} color={"white"}/></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <CategoriesDropdown/>
                            </Nav.Item>
                            <RoleBasedComponent roles={['staff', 'manager', 'admin', 'user']}>
                                <Nav.Item>
                                    <Nav.Link as={Link} to="/tasks"><FaTasks size={"25"} color={"orange"}/></Nav.Link>
                                </Nav.Item>
                            </RoleBasedComponent>
                        </Nav>
                        <Form className="d-flex">
                            <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search"/>
                            <Button variant="outline-success dark" type="submit"><ImSearch size={"20"} color={"orange"}/></Button>
                        </Form>
                        <div>
                            <Nav className="ms-2 me-auto">
                                <Nav.Item>
                                    <Nav.Link as={Link} to="/login"><BiSolidLogInCircle size={"30"} color={"white"}/></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onClick={handleShow}> <FaShoppingCart size={"25"} color={"white"}/></Nav.Link>
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
