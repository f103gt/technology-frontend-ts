import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const AddProductModal = ({categoryName, show, setShow}) => {
    console.log("in modal");
    const [productName, setProductName] = useState("");
    const [productSku, setProductSku] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [productDescription, setProductDescription] = useState(null);
    const [productImages, setProductImages] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("sku", productSku);
        formData.append("price", productPrice);
        formData.append("quantity", productQuantity);
        formData.append("description", productDescription);
        productImages.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });
        axios.post("url", formData, {
            headers:
                {"Content-Type": "application/json"},
        }).then(() => {
        })
    }

    return (
        <Modal show={show} onHide={()=>setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="productName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" value={productName} onChange={e => setProductName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="productSku">
                        <Form.Label>SKU</Form.Label>
                        <Form.Control type="text" value={productSku} onChange={e => setProductSku(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="productPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" value={productPrice}
                                      onChange={event => setProductPrice(event.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="productQuantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" value={productQuantity}
                                      onChange={event => setProductQuantity(event.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="productDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type={"file"} label="Product Description"
                                  onChange={event => setProductDescription(event.target.files[0])}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Images</Form.Label>
                        <Form.Control type="file" label="Product Images" multiple
                                  onChange={event => setProductImages(event.target.files)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddProductModal;