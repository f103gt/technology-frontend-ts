import React, {useContext, useState} from 'react';
import PendingOrders from "../components/tasks/PendingOrders";
import {Card, Container, Tab, Tabs} from "react-bootstrap";
import PackedOrders from "../components/tasks/PackedOrders";
import {LoadingContext} from "../context/LoadingContext";

const ToDoList = () => {
    const [activeTab, setActiveTab] = useState('pending');

    const {isLoading, setLoading} = useContext(LoadingContext);


    return (
        <Container style={{
            flexDirection: 'column',
            marginTop: '30px',
            display: 'flex',
            width: '97vw', maxWidth: '97vw',
            maxHeight: '85vh',
            overflowX: "hidden",
        }}>
            <Card style={{
                boxSizing: 'border-box',
                height: '85vh',
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }}>

                <div className="card-body p-5">
                    <div className="tab-content" id="ex1-content" role={"tabpanel"}>
                        <div stule={{padding: '10px',
                        maxHeight: '70vh',
                            overflowY:"scroll"}}>
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
                        </Tabs></div>
                    </div>
                </div>

            </Card>
        </Container>
    );
};

export default ToDoList;
