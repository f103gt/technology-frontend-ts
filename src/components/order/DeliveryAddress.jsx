import React, {useState} from 'react';
import {Col, Form, Row} from 'react-bootstrap';
import AddressInput from './AddressInput';

//TODO CHECK DELIVERY ADDRESS SET UP FOR COURIER
const DeliveryAddress = ({
                             deliveryMethods,
                             updateAddressData,
                             updateOrderFormData,
                             updateDeliveryMethod,
                         }) => {
    const [region, setRegion] = useState('');
    const [street, setStreet] = useState('');
    const [premise, setPremise] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [postalOffice, setPostalOffice] = useState('');
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('none');

    const updateRegion = (value) => {
        setRegion(value);
        updateAddressData({region: value});
    };

    const updateStreet = (event) => {
        setStreet(event.target.value);
        updateAddressData({street: event.target.value})

    }

    const updatePremise = (event) => {
        setPremise(event.target.value);
        updateAddressData({premise: event.target.value})

    }

    const updatePostalCode = (event) => {
        setPostalCode(event.target.value);
        updateAddressData({postalCode: event.target.value})

    }
    const updatePostalOffice = (event) => {
        setPostalOffice(event.target.value);
        updateAddressData({postalOffice: event.target.value})

    }
    const handleDeliveryMethodChange = (event) => {
        const selectedMethod = event.target.value;
        updateOrderFormData({deliveryMethod: selectedMethod});
        updateDeliveryMethod(selectedMethod);
        setSelectedDeliveryMethod(selectedMethod);
    };

    const displayFields = () => {
        if (selectedDeliveryMethod && deliveryMethods[selectedDeliveryMethod]?.name === 'Courier') {
            return (
                <>
                    <Col md={12}>
                        <Form.Group className="form-outline">
                            <AddressInput updateRegion={updateRegion}
                                          value={region}
                                          onChange={updateRegion}/>
                            <Form.Label htmlFor="form5">Region</Form.Label>
                        </Form.Group>
                    </Col>
                    <Row><Col md={6}>
                        <Form.Group className="form-outline">
                            <Form.Control type="text" id="form5" className="order-form-input"
                                          value={street}
                                          onChange={updateStreet}/>
                            <Form.Label htmlFor="form5">Street</Form.Label>
                        </Form.Group>
                    </Col><Col sm={3} className="mt-2 mt-sm-0">
                        <Form.Group className="form-outline">
                            <Form.Control type="text" id="form8" className="order-form-input"
                                          value={premise}
                                          onChange={updatePremise}/>
                            <Form.Label htmlFor="form8">Premise</Form.Label>
                        </Form.Group>
                    </Col><Col sm={3} className="mt-2 mt-sm-0">
                        <Form.Group className="form-outline">
                            <Form.Control type="text" id="form9" className="order-form-input"
                                          value={postalCode}
                                          onChange={updatePostalCode}/>
                            <Form.Label htmlFor="form9">Postal / Zip Code</Form.Label>
                        </Form.Group>
                    </Col></Row></>
            );
        }
        return (
            <><Col md={12}>
                <Form.Group className="form-outline">
                    <AddressInput updateRegion={updateRegion}
                                  value={region}
                                  onChange={updateRegion}/>
                    <Form.Label htmlFor="form5">Region</Form.Label>
                </Form.Group>
            </Col><Col md={12}>
                <Form.Group className="form-outline">
                    <Form.Control type="text" id="form5" className="order-form-input"
                                  value={postalOffice}
                                  onChange={updatePostalOffice}/>
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
                    <Form.Select
                        style={{marginBottom: '30px'}}
                        className="order-form-input"
                        onChange={handleDeliveryMethodChange}
                        value={selectedDeliveryMethod}>
                        <option value="none">Select Delivery Method</option>
                        {Object.keys(deliveryMethods).map((method, index) => (
                            <option key={index} value={method}>
                                {deliveryMethods[method ].name}
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