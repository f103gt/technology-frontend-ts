import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {RoleBasedComponent} from "./RoleBasedComponent";
import ProductCard from "./ProductCard";

interface Product {
    productName: string;
    productPrice: number;
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const {categoryName} = useParams<string>();

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


    //TODO rewrite setButtons and setSinge button to be united under one reusable function

    const setSingleButton = (roles: any) => {
        return (
            <RoleBasedComponent roles={roles}>
                <button type="button" className="btn btn-info" >Add</button>
            </RoleBasedComponent>
        );
    };

    return (
        <div>
            <section style={{backgroundColor: '#eee'}}>
                <div className="container py-5">
                    <div className="row">
                        {products.map(product => (
                            <ProductCard key={product.productName} product={product} categoryName={categoryName} />
                        ))}
                    </div>
                    {setSingleButton(["user","admin","manager"])}
                </div>
            </section>
        </div>
    );
}
export default Products;