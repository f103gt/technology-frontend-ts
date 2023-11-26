import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import {FaRegCheckCircle, FaUserCircle} from "react-icons/fa";
import {RoleBasedComponent} from "../utilities/RoleBasedComponent";
import {IoMdLogOut} from "react-icons/io";
import {TiDeleteOutline} from "react-icons/ti";
import axios from "axios";

const AccountModal = ({show, setShow}) => {
    const [isActive, setIsActive] = useState(true);
    const [userData, setUserData] = useState();

    //TODO IF COMMUNICATE WITH SERVER WILL BE WORKING WELL USE THIS FUNCTION TO RETURN ORDERS DATA
    const communicateWithServer = (method, url, setStatus) => {
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
        communicateWithServer('post', "/staff/set-is-active", updateActivity);
    }

    const inactivateEmployee = () => {
        communicateWithServer('post', "/staff/set-not-active", updateActivity);
    }

    const eraseData = () => {
        localStorage.clear();
    }

    const logout = () => {
        communicateWithServer("get", "/api/v1/auth/logout", eraseData);
        setShow(false);
    }

    const handleClose = () => {
        setShow(false);
    };

    if(!userData){
        return null;
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body style={{backgroundColor: '#eee', borderRadius: '15px'}}>
                <div className="card" style={{borderRadius: '15px'}}>
                    <div className="card-body text-center">
                        <div className="mt-3 mb-4">
                            <FaUserCircle size={"50"}/>
                        </div>
                        <h4 className="mb-2">{userData.firstName} {userData.lastName}</h4>
                        <p className="text-muted mb-4">{userData.email}</p>
                        <RoleBasedComponent roles={["admin", "manager", "staff"]}>
                            <Button variant={"btn btn-as-link"}>
                                {isActive ? (
                                    <FaRegCheckCircle size={"35"} color={"green"}
                                                      onClick={activateEmployee}/>
                                ) : (
                                    <TiDeleteOutline size={"35"} color={"red"}
                                                     onClick={inactivateEmployee}/>
                                )}
                            </Button>
                        </RoleBasedComponent>
                        <Button type="button" variant={"dark"} onClick={logout}>
                            Logout <IoMdLogOut size={"25"}/>
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default AccountModal;
