import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const AddProductModal = ({categoryName, show, setShow}) => {
    const [productName, setProductName] = useState("");
    const [productSku, setProductSku] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [productDescription, setProductDescription] = useState(null);
    const [primaryImage, setPrimaryImage] = useState(null);
    const [productImages, setProductImages] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const product = {
            categoryName: categoryName,
            productName: productName,
            sku: productSku,
            quantity: productQuantity,
            price: productPrice
        };

        const formData = new FormData();
        formData.append("product", JSON.stringify(product));
        formData.append("description", productDescription);
        formData.append("primaryImage", primaryImage);
        productImages.forEach((image, index) => {
            formData.append(`images`, image);  // Append the images as an array
        });

        axios.get("/csrf/api/v1")
            .then(response => {
                const csrfToken = response.data.headers;
                axios({
                    method: 'post',
                    url: "/manager/add-product",
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    withCredentials: true
                })
                    .catch(error => {
                        alert(error)
                    });
            });

    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
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
                        <Form.Control type={"file"} label="Product Description" accept={".txt"}
                                      onChange={event => setProductDescription(event.target.files[0])}/>
                    </Form.Group>

                    <Form.Group controlId="primaryImage">
                        <Form.Label>Primary Image</Form.Label>
                        <Form.Control type={"file"} label="Product Description" accept={[".png",".jpg",".jpeg"]}
                                      onChange={event => setPrimaryImage(event.target.files[0])}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Images</Form.Label>
                        <Form.Control type="file" label="Product Images" multiple accept={[".png",".jpg",".jpeg"]}
                                      onChange={event => setProductImages(Array.from(event.target.files))}/>
                    </Form.Group>
                    <Button variant="dark" type="submit">Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddProductModal;