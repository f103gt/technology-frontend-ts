import React, {useEffect} from 'react';
import axios from "axios";

const Activity = () => {
    useEffect(() => {
        axios.get('/csrf/api/v1')
            .then(csrfResponse => {
                const csrfToken = csrfResponse.data.headers;
                axios.get('/staff/set-is-active', {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    }
                })
                    .catch(error => {
                        console.error('Error fetching categories:', error);
                    })
            })
            .catch(error => {
                console.error('Error fetching CSRF token:', error);
            });
    }, []);
    return (
        <div>
            <p>active</p>
        </div>
    );
};

export default Activity;