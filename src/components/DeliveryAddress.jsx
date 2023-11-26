import React, {useEffect, useState} from 'react';
import {Col, Form, Row} from "react-bootstrap";
import AddressInput from "./AddressInput";

const DeliveryAddress = ({
                             deliveryMethod,
                             setDeliveryMethod,
                             address,
                             setAddress,
                             updateOrderFormData
                         }) => {

    const [region, setRegion] = useState('');
    const [street, setStreet] = useState('');
    const [premise, setPremise] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [postalOffice, setPostalOffice] = useState('');

    useEffect(() => {
        let newAddress = region;
        if (deliveryMethod === 'courier') {
            newAddress += ` ${street} ${premise} ${postalCode}`;
        } else {
            newAddress += ` ${postalOffice}`;
        }
        setAddress(newAddress);
        updateOrderFormData({address: newAddress});
    }, [region, street, premise, postalCode, postalOffice, deliveryMethod]);

    const [deliveryMethods, setDeliveryMethods] = useState({
        courier: {
            name: 'Courier',
            selected: false,
            price: 20.00,
        },
        meest: {
            name: 'Meest',
            selected: false,
            price: 15.00,
        },
    });

    const displayFields = () => {
        if (deliveryMethod && deliveryMethods[deliveryMethod]?.name === "Courier") {
            return (
                <>
                    <Col md={12}>
                        <Form.Group className="form-outline">
                            {/*<Form.Control type="text" id="form5" className="order-form-input"/>*/}
                            <AddressInput value={region}
                             onChange={(event)=>setRegion(event.target.value)}/>
                            <Form.Label htmlFor="form5">Region</Form.Label>
                        </Form.Group>
                    </Col>
                    <Row><Col md={6}>
                        <Form.Group className="form-outline">
                            <Form.Control type="text" id="form5" className="order-form-input"
                                          value={street}
                                          onChange={(event)=>setStreet(event.target.value)}/>
                            <Form.Label htmlFor="form5">Street</Form.Label>
                        </Form.Group>
                    </Col><Col sm={3} className="mt-2 mt-sm-0">
                        <Form.Group className="form-outline">
                            <Form.Control type="text" id="form8" className="order-form-input"
                                          value={premise}
                                          onChange={(event)=>setPremise(event.target.value)}/>
                            <Form.Label htmlFor="form8">Premise</Form.Label>
                        </Form.Group>
                    </Col><Col sm={3} className="mt-2 mt-sm-0">
                        <Form.Group className="form-outline">
                            <Form.Control type="text" id="form9" className="order-form-input"
                                          value={postalCode}
                                          onChange={(event)=>setPostalCode(event.target.value)}/>
                            <Form.Label htmlFor="form9">Postal / Zip Code</Form.Label>
                        </Form.Group>
                    </Col></Row></>
            );
        }
        return (
            <><Col md={12}>
                <Form.Group className="form-outline">
                    <AddressInput value={region}
                                  onChange={(event)=>setRegion(event.target.value)}/>
                    <Form.Label htmlFor="form5">Region</Form.Label>
                </Form.Group>
            </Col><Col md={12}>
                <Form.Group className="form-outline">
                    <Form.Control type="text" id="form5" className="order-form-input"
                    value={postalOffice}
                                  onChange={(event)=>setPostalOffice(event.target.value)}/>
                    <Form.Label htmlFor="form5">Postal Office</Form.Label>
                </Form.Group>
            </Col></>
        )
    }

    return (
        <div>
            <Row className="mt-3 mx-4">
                <Col md={12}>
                    <Form.Label className="order-form-label">Delivery Method</Form.Label>
                    <Form.Select style={{marginBottom: '30px'}}
                        className="order-form-input" onChange={(event)=>setDeliveryMethod(event.target.value)}>
                        {Object.keys(deliveryMethods).map((method, index) => (
                            <option key={index} value={method}>
                                {deliveryMethods[method].name}
                            </option>
                        ))}
                    </Form.Select>
                    {displayFields()}
                </Col>
            </Row>
        </div>
    );
};

export default DeliveryAddress;