import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {IoMdAddCircle} from "react-icons/io";

const CategoryInputField = ({parentCategoryName,setActiveCategory}) => {
    const [newCategoryName, setNewCategoryName] = useState("");
    const [isSaved,setIsSaved] = useState(false);
    const submitForm = (event) => {
        event.preventDefault();
        const requestBody = {
            parentCategory: parentCategoryName,
            category: newCategoryName
        }
        axios.get("/csrf/api/v1")
            .then(response => {
                const csrfToken = response.data.headers;
                axios({
                    method: 'post',
                    url: "/manager/add-category",
                    data: requestBody,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    withCredentials: true
                })
                    .then(response => {
                        if (response.status === 200) {
                            setActiveCategory("");
                        }
                    })
                    .catch(error => {
                        alert(error)
                    });
            });
    }
    if(isSaved){
        return null;
    }
    return (
        <Form onSubmit={submitForm}>
            <Form.Group>
                <Form.Control type="text" value={newCategoryName}
                              onChange={e => setNewCategoryName(e.target.value)}></Form.Control>
            </Form.Group>
           {/* <Button variant="primary" type="submit">Submit</Button>*/}
            <Button variant="btn btn-link" type="submit" className="custom-button">
                < IoMdAddCircle color="white" />
            </Button>
        </Form>
    );
};

export default CategoryInputField;