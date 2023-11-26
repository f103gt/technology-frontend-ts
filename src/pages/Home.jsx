import React, {useEffect, useRef} from 'react';
import {Image} from 'react-bootstrap';
import background from '../3147814222581.jpg';
import '../css/Home.css';
import UserGuide from "../components/UserGuide";
import ManagerGuide from "../components/ManagerGuide";

const Home = () => {
    const imageRef = useRef(null);

    useEffect(() => {
        function setMaxDimensions() {
            const navbar = document.querySelector('.navbar');
            const windowHeight = window.innerHeight;

            if (navbar && imageRef.current) {
                const navbarHeight = navbar.offsetHeight;
                const viewportHeight = windowHeight - navbarHeight;

                imageRef.current.style.width = '100%';
                imageRef.current.style.height = `${viewportHeight}px`;
            }
        }

        setMaxDimensions();
        window.addEventListener('resize', setMaxDimensions);

        return () => {
            window.removeEventListener('resize', setMaxDimensions);
        };
    }, []);

    return (
        <div className="home-container">
            <div className="home-banner-container">
                <div className="home-bannerImage-container">
                    <Image src={background} ref={imageRef} alt="" fluid/>
                </div>
                <div className="home-text-overlay">
                    <div className="home-text-section">
                        <h1 className="primary-heading">
                            TECHNOLOGY
                        </h1>
                        <p className="primary-text">
                            Healthy switcher chefs do all the prep work, like peeding, chopping
                            & marinating, so you can cook a fresh food.
                        </p>
                    </div>
                </div>
            </div>
            <ManagerGuide/>
        </div>
    );
};

export default Home;


/*const clientId = "123"; // Your unique client ID
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
    };*/