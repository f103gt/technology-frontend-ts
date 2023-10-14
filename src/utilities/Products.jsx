import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";

const Products = () => {
    let [products, setProducts] = useState([]);
    let {categoryName} = useParams();
    useEffect(() => {
        fetch(`/api/v1/category-products?categoryName=${categoryName}`, {
            method: "GET"
        })
            .then(result => result.json())
            .then(data => {
                console.log(data);
                setProducts(data);
            });
    }, [categoryName]);


    const renderProducts = () => {
        return (products.map(product => (

                <div className="col-md-12 col-lg-4 mb-4">
                    <div className="card">
                        <div className="d-flex justify-content-between p-3">
                            <div
                                className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                                style={{width: '35px', height: '35px'}}
                                key={product.productName}>
                                <p className="text-white mb-0 small">x4</p>
                            </div>
                        </div>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp"
                             className="card-img-top" alt="Laptop"/>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <p className="small"><a href="#!" className="text-muted">Laptops</a></p>
                                <p className="small text-danger"><s>$1099</s></p>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                                <p><Link to={`/${categoryName}/${product.productName}`}
                                         className="text-muted"></Link></p>
                                <h5 className="mb-0">{product.productName}</h5>
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
                </div>
            </section>
        </div>
    );
};

export default Products;