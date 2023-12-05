import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import ToDoCard from "./ToDoCard";

const PendingOrders = ({setLoading}) => {
    const [pendingOrders, setPendingOrders] = useState([]);

    const fetchPendingOrders = useCallback(() => {
        setLoading(true);
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
            })
            .catch(error => {
                console.error('Error fetching CSRF token:', error);
            });
    }, [setPendingOrders, setLoading]);


    useEffect(() => {
        fetchPendingOrders();
    }, [fetchPendingOrders]);


    return (
        <div className="tab-pane fade show active"
             id="ex1-tabs-1" role="tabpanel"
             aria-labelledby="ex1-tab-1"
             onSelect={fetchPendingOrders}>
            <ul className="list-group mb-0">
                {pendingOrders.map(uuid => (
                    <ToDoCard key={uuid} uuid={uuid}
                              url={`/staff/change-order-status-packed?orderUI=${uuid}`}/>
                ))}

            </ul>
        </div>
    );
};

export default PendingOrders;