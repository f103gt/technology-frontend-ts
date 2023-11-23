import React, {useEffect} from 'react';
import {getToken,onMessage} from 'firebase/messaging';
import {messaging} from '../utilities/config'

const PushNotificationComponent = () => {

    async function requestPermission() {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const token = await getToken(messaging,
                {vapidKey: 'BCjuAXZDOD0IxvWUHFFhD1LwhVPcVCYUxVeKuSAndJ3Fi0_FDXBA-dHhI3aNbmlt7_OZvP9TRjlgYKz0-1C-DPQ'});
            console.log("token generated: " + token);
            await fetch('notification/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token}), // Send the FCM token to the backend
            });
        } else if (permission === 'denied') {
            console.log("Permission denied");
        }
    }

    useEffect(() => {
        const initializeFirebaseMessaging = async () => {
            // Handle incoming messages in the foreground
            onMessage(messaging, (payload) => {
                console.log('Message received in the foreground:', payload);
                // Display the notification or update the UI as needed
            });

        };

        initializeFirebaseMessaging();
    }, []);
    return (
        <div>
            <button onClick={requestPermission}>Enable notifications</button>
        </div>
    );
};

export default PushNotificationComponent;

/*
           // Handle incoming messages in the background
           // This requires a service worker to be registered in the public folder
           // See:
           messaging.setBackgroundMessageHandler((payload) => {
               console.log('Message received in the background:', payload);
               // Customize the notification here
               const notificationTitle = 'Background Message Title';
               const notificationOptions = {
                   body: 'Background Message body.',
                   icon: '/firebase-logo.png'
               };

               return self.registration.showNotification(notificationTitle,
                   notificationOptions);
           });*/

// Handle token refresh
/*onTokenRefresh(messaging, async () => {
    const refreshedToken = await getToken(messaging);
    console.log('Refreshed FCM Token:', refreshedToken);
    // Send the refreshed token to the backend if needed
});*/