import React, {useCallback, useState} from 'react';
import ToDoCard from "../components/ToDoCard";
import axios from "axios";

const ToDoList = () => {
    const [pendingOrders,setPendingOrders] = useState([]);
    const [packedOrders,setPackedOrders] = useState([]);
    const [sentOrders,setSentOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPendingOrders = useCallback(() => {
        axios.get('/csrf/api/v1')
            .then(csrfResponse => {
                const csrfToken = csrfResponse.data.headers;
                axios.get('/staff/get-all-pending-orders', {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    }
                })
                    .then(pendingOrders => {
                        setPendingOrders(pendingOrders.data);
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
    }, [setPendingOrders]);

    return (
        <div>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">

                            <div className="card">
                                <div className="card-body p-5">
                                    <ul className="nav nav-tabs mb-4 pb-2" id="ex1" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link active" id="ex1-tab-1" role="tab"
                                               aria-controls="ex1-tabs-1" aria-selected="true">Pending</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="ex1-tab-2" role="tab"
                                               aria-controls="ex1-tabs-2" aria-selected="false">Packed</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="ex1-tab-3" role="tab"
                                               aria-controls="ex1-tabs-3" aria-selected="false">Sent</a>
                                        </li>
                                    </ul>

                                    <div className="tab-content" id="ex1-content" role={"tabpanel"}>

                                        <div className="tab-pane fade show active" id="ex1-tabs-1" role="tabpanel"
                                             aria-labelledby="ex1-tab-1">
                                            <ul className="list-group mb-0">
                                                {pendingOrders.map(pendingOrder=>(
                                                    <ToDoCard order={pendingOrder}/>
                                                ))}

                                            </ul>
                                        </div>

                                        <div className="tab-pane fade" id="ex1-tabs-2" role="tabpanel"
                                             aria-labelledby="ex1-tab-2">

                                        </div>
                                        <div className="tab-pane fade" id="ex1-tabs-3" role="tabpanel"
                                             aria-labelledby="ex1-tab-3">

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ToDoList;
