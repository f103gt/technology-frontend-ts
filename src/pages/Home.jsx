import React from 'react';

const Home = () => {
    const clientId = "123"; // Your unique client ID
    const eventSource = new EventSource('/subscribe?clientId=' + clientId);

    eventSource.onopen = function() {
        console.log('SSE connection established');
    };

    eventSource.onmessage = function(event) {
        console.log('Received event:', event);
        // Handle incoming events here
    };

    eventSource.onerror = function(error) {
        console.error('Error occurred:', error);
        // Handle errors here
    };


    return (
        <div>
            <h1>hello</h1>
        </div>
    );
};

export default Home;
