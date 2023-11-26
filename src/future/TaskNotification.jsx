import React, {useEffect} from 'react';
import {Alert} from 'react-bootstrap';
import axios from "axios";

export const NotificationContext = React.createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = React.useState(null);

    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const Notification = ({ message }) => {
    return (
        <div className="notification">
            {message}
        </div>
    );
};

const TaskNotification = () => {
    useEffect(() => {
        axios.get('/csrf/api/v1')
            .then(csrfResponse => {
                const csrfToken = csrfResponse.data.headers;
                axios.get('/trigger-notification', {
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
            <Alert>a message for someone</Alert>
        </div>
    );
};

export default TaskNotification;


/*const [employeeEmail, setEmployeeEmail] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [stompClient, setStompClient] = useState(null);


    const onMessageReceived = (message) => {
        const receivedMessage = JSON.parse(message.body);
        setCurrentEmail(receivedMessage.email);
        setEmployeeEmail(receivedMessage.employeeEmail);
    };

    useEffect(() => {
        const socket = new SockJS('/socket/');
        const client = Stomp.over(socket);
        client.connect({}, () => {
            /!*client.send('/server/trigger-socket', {}, JSON.stringify("hello"));*!/
            client.subscribe('/notification/general', onMessageReceived);
        });
        setStompClient(client);

        return () => {
            client.disconnect();
        };
    }, []);*/


// Retrieve user ID from local storage
//const userId = localStorage.getItem('id'); // Replace 'userId' with your actual key