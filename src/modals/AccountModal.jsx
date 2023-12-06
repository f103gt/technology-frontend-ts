import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import {FaRegCheckCircle, FaUserCircle} from "react-icons/fa";
import {RoleBasedComponent} from "../utilities/RoleBasedComponent";
import {IoMdLogOut} from "react-icons/io";
import {TiDeleteOutline} from "react-icons/ti";
import axios from "axios";
import {communicateWithServer} from "../utilities/ServerCommunication";
import {Card} from "react-bootstrap";

const AccountModal = ({show, setShow}) => {
    const [isActive, setIsActive] = useState(false);
    const [userData, setUserData] = useState();
    const [errorMessage, setErrorMessage] = useState("");

    //TODO IF COMMUNICATE WITH SERVER WILL BE WORKING WELL USE THIS FUNCTION TO RETURN ORDERS DATA
    const communicateWithServerLocal = (method, url, setStatus) => {
        axios.get('/csrf/api/v1')
            .then(response => {
                const csrfToken = response.data.headers;
                axios({
                    method: method,
                    url: url,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    withCredentials: true
                })
                    .then(response => {
                        if (response.status === 200) {
                            setStatus();
                        }
                    })
                    .catch(error => {
                        alert(error);
                    });
            });
    }


    const fetchUserData = () => {
        axios.get('/csrf/api/v1')
            .then(response => {
                const csrfToken = response.data.headers;
                axios({
                    method: "get",
                    url: "/get-user-data",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    withCredentials: true
                })
                    .then(response => {
                        if (response.status === 200) {
                            setUserData(response.data);
                        }
                    })
                    .catch(error => {
                        alert(error);
                    });
            });
    };

    useEffect(() => {
        if (show) {
            fetchUserData();
        }
    }, [show]);

    const updateActivity = () => {
        if (isActive) {
            setIsActive(false);
        } else {
            setIsActive(true);
        }
    }
    const activateEmployee = () => {
        communicateWithServerLocal('get', "/staff/set-is-active", updateActivity);
    }

    const inactivateEmployee = () => {
        communicateWithServerLocal('get', "/staff/set-not-active", updateActivity);
    }

    const eraseData = () => {
        if(isActive){
            inactivateEmployee();
        }
        localStorage.clear();
        setShow(false);
    }

    const handleLogoutError = (error) => {
        setErrorMessage(error.message || error);
    }
    const logout = () => {
        communicateWithServer({
            method: "get",
            url: "/api/v1/auth/logout",
            executeFunction: eraseData,
            executeFunctionArgs: [setShow],
            handleError: handleLogoutError,
            reload: true
        });

    }

    const handleClose = () => {
        setShow(false);
    };

    if (!userData) {
        return null;
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body style={{backgroundColor: '#eee', borderRadius: '15px'}}>
                {errorMessage && <p color={"red"} className="error">{errorMessage}</p>}
                <Card style={{
                    borderRadius: '15px',
                    height: "275px"
                }}>
                    <div className="card-body text-center">
                        <div className="mt-3 mb-4">
                            <FaUserCircle size={"50"}/>
                        </div>
                        <h4 className="mb-2">{userData.firstName} {userData.lastName}</h4>
                        <p className="text-muted mb-4">{userData.email}</p>
                        <RoleBasedComponent roles={["staff"]}>
                            <Button variant={"btn btn-as-link"}
                                    style={{ width: "50px", height: "50px", padding: "0" }}>
                                {isActive ? (
                                    <FaRegCheckCircle size={"35"} color={"green"}
                                                      onClick={activateEmployee}/>
                                ) : (
                                    <TiDeleteOutline size={"45"} color={"red"}
                                                     onClick={inactivateEmployee}/>
                                )}
                            </Button>
                        </RoleBasedComponent>
                        <Button type="button" variant={"dark"} onClick={logout}>
                            Logout <IoMdLogOut size={"25"}/>
                        </Button></div>
                </Card>
            </Modal.Body>
        </Modal>
    );
};

export default AccountModal;
