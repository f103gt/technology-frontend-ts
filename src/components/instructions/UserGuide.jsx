import React, {useState} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import {
    PiNumberCircleFiveBold,
    PiNumberCircleFourBold,
    PiNumberCircleOneBold,
    PiNumberCircleSixBold,
    PiNumberCircleThreeBold,
    PiNumberCircleTwoBold
} from "react-icons/pi";

const UserGuide = ({stepContent,instructionsHeader}) => {
        const [activeStep, setActiveStep] = useState(null);

        const toggleStep = (step) => {
            if (activeStep === step) {
                setActiveStep(null);
            } else {
                setActiveStep(step);
            }
        };

        const renderSubSteps = (stepContent) => {
            return stepContent.map((subAction, index) => (
                <Card.Body key={index}>
                    <p>{subAction}</p>
                </Card.Body>
            ));
        };

        return (
            <div className="container">
                <h2 className="text-center mt-4 mb-4">{instructionsHeader}</h2>
                <div className="d-flex justify-content-center">
                    <Accordion defaultActiveKey="0" className="w-100">
                        {stepContent.map((step, index) => (
                            <Card key={index}>
                                <Accordion.Item eventKey={`${index}`}>
                                    <Accordion.Header as={Card.Header} eventKey={`${index}`}>
                                        {index + 1 === 1 && <PiNumberCircleOneBold/>}
                                        {index + 1 === 2 && <PiNumberCircleTwoBold/>}
                                        {index + 1 === 3 && <PiNumberCircleThreeBold/>}
                                        {index + 1 === 4 && <PiNumberCircleFourBold/>}
                                        {index + 1 === 5 && <PiNumberCircleFiveBold/>}
                                        {index + 1 === 6 && <PiNumberCircleSixBold/>}
                                        &nbsp;<strong><h4>{step.action}</h4></strong>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {step.content.map((content, i) => (
                                            <div key={i}>
                                                <h5>{content.subAction}</h5>
                                                <Accordion.Collapse eventKey={`${index}`}>
                                                    <Card.Body>
                                                        <Card.Body>
                                                            {content.instructions.map((instruction, i) => (
                                                                <div key={i}>
                                                                    {instruction.toString().startsWith('ATTENTION!') ? (
                                                                        <p>{instruction}</p>
                                                                    ) : (
                                                                        <p>{i + 1}. {instruction}</p>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </Card.Body>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </div>
                                        ))}
                                    </Accordion.Body>

                                </Accordion.Item>
                            </Card>
                        ))}
                    </Accordion>
                </div>
            </div>
        );
    }
;
export default UserGuide;