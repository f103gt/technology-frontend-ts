import React from 'react';
import {Link} from "react-router-dom";
import {RoleBasedComponent} from "../../utilities/RoleBasedComponent";
import {Card, Col} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {RiDeleteBin5Fill} from "react-icons/ri";
import {MdAutoFixHigh} from "react-icons/md";

const ProductCard = ({product, categoryName}) => {
    const setButtons = (roles) => {
        return (
            <RoleBasedComponent roles={roles}>
                <Button className="btn btn-link">
                    <RiDeleteBin5Fill color={"grey"}
                                      size={"25"}/></Button>
                <button className="btn btn-link"><MdAutoFixHigh color={"grey"} size={"25"}/></button>
            </RoleBasedComponent>
        );
    };

    return (
        <Col md={12} lg={4} className="mb-4" key={product.productName}>
            <Card>
                <Card.Body className="d-flex justify-content-between p-3">
                </Card.Body>
                <Card.Img variant="top" src={product.primaryImage} alt="Laptop" loading={"lazy"}/>
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <small><Link to={""} className="text-muted">{categoryName}</Link></small>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                        <p><span className="text-muted"></span></p>
                        <h5 className="mb-0">
                            <Link to={`/${categoryName}/${product.productName}`}
                            style={{color:"#212529", textDecoration:'none'}}>
                                {product.productName}</Link>
                        </h5>
                        <h5 className="text-dark mb-0">{product.price.toFixed(2)}$</h5>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                        <p className="text-muted mb-0">Available: <span className="fw-bold">{product.quantity}</span></p>
                        {setButtons(["staff", "manager","admin"])}
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default ProductCard;