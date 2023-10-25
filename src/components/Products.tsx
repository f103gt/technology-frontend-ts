import React, {useCallback, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

interface Product {
    productName: string;
    productPrice: number;
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [role, setRole] = useState("");
    const {categoryName} = useParams<string>();
    const navigate = useNavigate();

    const fetchProductData = useCallback(() => {
        axios.get("/csrf/api/v1")
            .then(response => {
                const csrfToken = response.data.headers;
                axios.get(`/api/v1/category-products?categoryName=${categoryName}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    }
                })
                    .then(result => {
                        setProducts(result.data);
                    });
            })
    }, [categoryName]);

    useEffect(() => {
        fetchProductData();
    }, [fetchProductData]);

    useEffect(() => {
        const userRole = Cookies.get("role");
        if (userRole) {
            setRole(userRole);
            console.log(role);
        }
    }, [role]);

    const setButtons = () => {
        if (role && (role === "manager" || role === "admin")) {
            return (
                <div>
                    <button type="button" className="btn btn-info">Delete</button>
                    <span>&nbsp;</span>
                    <button type="button" className="btn btn-info">Modify</button>
                </div>)
        }
    }

    const setSingleButton = () => {
        if (role && (role === "manager" || role === "admin")) {
            return (
                <div>
                    <button type="button" className="btn btn-info">Add</button>
                </div>)
        }
    }
    const renderProducts = () => {
        return (products.map(product => (
                <div className="col-md-12 col-lg-4 mb-4" key={product.productName}>
                    <div className="card">
                        <div className="d-flex justify-content-between p-3">
                            <div
                                className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                                style={{width: '35px', height: '35px'}}
                                key={categoryName}>
                                <p className="text-white mb-0 small">x4</p>
                            </div>
                        </div>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp"
                             className="card-img-top" alt="Laptop" loading={"lazy"}/>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <p className="small"><Link to={""} className="text-muted">Laptops</Link></p>
                                <p className="small text-danger"><s>$1099</s></p>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                                <p><span className="text-muted"></span></p>
                                <h5 className="mb-0">
                                    <Link to={`/${categoryName}/${product.productName}`}>{product.productName}</Link>
                                </h5>
                                <h5 className="text-dark mb-0">{product.productPrice}</h5>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <p className="text-muted mb-0">Available: <span className="fw-bold">6</span></p>
                                <div className="ms-auto text-warning">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                {setButtons()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        ))
    }

    return (
        <div>
            <section style={{backgroundColor: '#eee'}}>
                <div className="container py-5">
                    <div className="row">
                        {renderProducts()}
                    </div>
                    {setSingleButton()}
                </div>
            </section>
        </div>
    );
}
export default Products;