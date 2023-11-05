import React from 'react';
import {Link} from "react-router-dom";
import {RoleBasedComponent} from "../utilities/RoleBasedComponent";
import {Badge, Card, Col} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {RiDeleteBin5Fill} from "react-icons/ri";
import {MdAutoFixHigh} from "react-icons/md";

const ProductCard = ({ product, categoryName }) => {
    const setButtons = (roles) => {
        return (
            <RoleBasedComponent roles={roles}>
                <Button className="btn btn-link"><RiDeleteBin5Fill color={"black"} size={"25"}/></Button>
                <button className="btn btn-link"><MdAutoFixHigh color={"black"} size={"25"}/></button>
            </RoleBasedComponent>
        );
    };

    return (
        <Col md={12} lg={4} className="mb-4" key={product.productName}>
            <Card>
                <Card.Body className="d-flex justify-content-between p-3">
                    <Badge pill variant="info" className="d-flex align-items-center justify-content-center shadow-1-strong"
                           style={{width: '35px', height: '35px'}} key={categoryName}>
                        <p className="text-white mb-0 small">x4</p>
                    </Badge>
                </Card.Body>
                <Card.Img variant="top" src={product.primaryImage} alt="Laptop" loading={"lazy"} />
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <small><Link to={""} className="text-muted">Laptops</Link></small>
                        <small className="text-danger"><s>$1099</s></small>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                        <p><span className="text-muted"></span></p>
                        <h5 className="mb-0">
                            <Link to={`/${categoryName}/${product.productName}`}>{product.productName}</Link>
                        </h5>
                        <h5 className="text-dark mb-0">{product.price.toFixed(2)}$</h5>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                        <p className="text-muted mb-0">Available: <span className="fw-bold">6</span></p>
                        {setButtons(["user","manager","admin"])}
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default ProductCard;