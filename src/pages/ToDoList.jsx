import React, {useContext, useState} from 'react';
import PendingOrders from "../components/PendingOrders";
import {Tab, Tabs} from "react-bootstrap";
import PackedOrders from "../components/PackedOrders";
import {LoadingContext} from "../context/LoadingContext";

const ToDoList = () => {
    const [activeTab, setActiveTab] = useState('pending');

    const {isLoading,setLoading} = useContext(LoadingContext);


    return (
        <div>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">

                            <div className="card">
                                <div className="card-body p-5">
                                    <div className="tab-content" id="ex1-content" role={"tabpanel"}>
                                        <Tabs activeKey={activeTab}
                                              onSelect={(k) => setActiveTab(k)}
                                              id="controlled-tab-example">
                                            <Tab eventKey="pending" title="Pending">
                                                <PendingOrders
                                                    setLoading={setLoading}/>
                                            </Tab>
                                            <Tab eventKey="packed" title="Packed">
                                                <PackedOrders/>
                                            </Tab>
                                            <Tab eventKey="sent" title="Sent">
                                                {/*<SentOrders/>*/}
                                            </Tab>
                                        </Tabs>
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
