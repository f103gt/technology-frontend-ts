import React from 'react';
import "../css/Error.css";
import {Card, Container} from "react-bootstrap";

const Error = () => {
    return (
        <Container className="error-page"  style={{
            flexDirection: 'column',
            marginTop: '30px',
            display: 'flex',
            width: '97vw', maxWidth: '97vw',
            maxHeight: '85vh',
        }}>
            <Card style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '85vh',
            }}>
                <div>
                    <div className="loading">
                        <h1>500</h1>
                        <h2>Unexpected error has occurred<b></b></h2>
                        <div className="gears">
                            <div className="gear one">
                                <div className="bar"></div>
                                <div className="bar"></div>
                                <div className="bar"></div>
                            </div>
                            <div className="gear two">
                                <div className="bar"></div>
                                <div className="bar"></div>
                                <div className="bar"></div>
                            </div>
                            <div className="gear three">
                                <div className="bar"></div>
                                <div className="bar"></div>
                                <div className="bar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </Container>
    );
};

export default Error;