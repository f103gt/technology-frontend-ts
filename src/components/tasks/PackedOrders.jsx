import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import ToDoCard from "./ToDoCard";

const PackedOrders = () => {
    const [packedOrders, setPackedOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const fetchPackedOrders = useCallback(() => {
        axios.get('/csrf/api/v1')
            .then(csrfResponse => {
                const csrfToken = csrfResponse.data.headers;
                axios.get('/staff/get-all-packed-orders', {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    }
                })
                    .then(packedOrders => {
                        setPackedOrders(packedOrders.data);
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
    }, [setPackedOrders]);

    useEffect(() => {
        fetchPackedOrders();
    }, [fetchPackedOrders]);

    if(!packedOrders){
        return null;
    }
    return (
        <div className="tab-pane fade show active"
             id="ex1-tabs-1" role="tabpanel"
             aria-labelledby="ex1-tab-1"
             onSelect={fetchPackedOrders}>
            <ul className="list-group mb-0">
                {packedOrders.map(uuid => (
                    <ToDoCard key={uuid} uuid={uuid}
                    url={`/staff/change-order-status-sent?orderUI=${uuid}`}/>
                ))}
            </ul>
        </div>
    );
};

export default PackedOrders;