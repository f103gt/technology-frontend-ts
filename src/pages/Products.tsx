import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {RoleBasedComponent} from "../utilities/RoleBasedComponent";
import ProductCard from "../components/ProductCard";
import {LoadingContext} from "../context/LoadingContext";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

interface Product {
    productName: string;
    productPrice: number;
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const {categoryName} = useParams<string>();
    const {isLoading,setLoading} =  useContext(LoadingContext);

    const fetchProductData = useCallback(() => {
        setLoading(true);
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
                        setLoading(false);
                    });
            })
    }, [categoryName, setLoading]);

    useEffect(() => {
        fetchProductData();
    }, [fetchProductData]);


    //TODO rewrite setButtons and setSinge button to be united under one reusable function

    const setSingleButton = (roles: any) => {
        return (
            <RoleBasedComponent roles={roles}>
                <button type="button" className="btn btn-info">Add</button>
            </RoleBasedComponent>
        );
    };

    return (
        <div>
            {!isLoading ?(
                <section>
                    <div className="container py-5">
                        <div className="row">
                            {products.map(product => (
                                <ProductCard
                                    key={product.productName} product={product} categoryName={categoryName}/>
                            ))}
                        </div>
                        {setSingleButton(["user", "admin", "manager"])}
                    </div>
                </section>
            ):(
                <section>
                    <div className="container py-5">
                        <div className="row">
                            <div>
                                <Skeleton height={50} width={50}/>
                                <Skeleton height={200}/>
                                <Skeleton height={50}/>
                            </div>
                        </div>
                    </div>
                </section>
            )}

        </div>
    );
}
export default Products;