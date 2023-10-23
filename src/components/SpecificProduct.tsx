import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
interface SpecificProduct {
    productName: string;
    productImages: File[];
    productInfoFile: File;
    productQuantity: number;
    productPrice: number;
}

const SpecificProduct = () => {
    const [product, setProducts] = useState<SpecificProduct>();
    const {categoryName} = useParams<string>();
    const {productName} = useParams<string>();

    const fetchProductData = useCallback(() => {
        axios.get("/csrf/api/v1")
            .then(response => {
                const csrfToken = response.data.headers;
                axios.get(`/api/v1/specific-product?categoryName=${categoryName}&productName=${productName}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    }
                })
                    .then(result => {
                        setProducts(result.data);
                    });
            })
    }, [categoryName,productName]);

    useEffect(() => {
        fetchProductData();
    }, [fetchProductData]);
    return (
        <div>
            <button type="button" className="btn btn-info">Cart</button>
        </div>
    );
};

export default SpecificProduct;