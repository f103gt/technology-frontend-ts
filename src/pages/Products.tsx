import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {RoleBasedComponent} from "../utilities/RoleBasedComponent";
import ProductCard from "../components/product/ProductCard";
import {LoadingContext} from "../context/LoadingContext";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import AddProductModal from "../modals/AddProductModal";
import {IoMdAddCircle} from "react-icons/io";

interface Product {
    productName: string;
    productPrice: number;
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const {categoryName} = useParams<string>();
    const {isLoading,setLoading} =  useContext(LoadingContext);
    const [show,setShow] = useState(false);

    const [sortOption, setSortOption] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");

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

    const setSingleButton = (roles: any) => {
        return (
            <RoleBasedComponent roles={roles}>
                <button type="button" className="btn btn-as-link" onClick={()=>setShow(true)}>
                    <IoMdAddCircle size={"45"} color={"grey"}/></button>
            </RoleBasedComponent>
        );
    };

    const compareProducts = (a: Product, b: Product) => {
        let result = 0;
        switch (sortOption) {
            case "name":
                result = a.productName.localeCompare(b.productName);
                break;
            case "price":
                result = a.productPrice - b.productPrice;
                break;
            case "model":
                break;
            default:
                break;
        }
        if (sortOrder === "desc") {
            result = -result;
        }
        return result;
    };

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    return (
        <div>
            {!isLoading ?(
                <section>
                    <div className="container py-5">
                        <div className="row">
                            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                                <option value="name">Name</option>
                                <option value="price">Price</option>
                                <option value="model">Model</option>
                            </select>
                            <button onClick={toggleSortOrder}>{sortOrder === "asc" ? "Ascending" : "Descending"}</button>
                            {products.sort(compareProducts).map(product => (
                                <ProductCard
                                    key={product.productName} product={product} categoryName={categoryName}/>
                            ))}
                        </div>
                        {setSingleButton(["staff", "manager"])}
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
            <AddProductModal show={show} setShow={setShow} categoryName={categoryName}></AddProductModal>
        </div>
    );
}
export default Products;
