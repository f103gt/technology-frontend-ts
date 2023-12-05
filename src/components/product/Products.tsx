import React, {Component} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";

interface Product {
    productName: string;
    productPrice: number;
}

interface ProductsState {
    products: Product[];
}

interface PathValue extends Record<string, string | undefined> {
    categoryName: string;
}

interface ProductsProps {
    categoryName: string;
    navigate: ReturnType<typeof useNavigate>;
}

class Products extends Component<ProductsProps, ProductsState> {
    constructor(props: ProductsProps) {
        super(props);
        this.state = {
            products: [],
        };
    }

    componentDidMount() {
        this.fetchProductData();
    }

    componentDidUpdate(prevProps: ProductsProps) {
        // Only fetch product data if the categoryName has changed
        if (this.props.categoryName !== prevProps.categoryName) {
            this.fetchProductData();
        }
    }

    fetchProductData = () => {
        fetch(`/api/v1/category-products?categoryName=${this.props.categoryName}`, {
            method: "GET"
        })
            .then(result => result.json())
            .then(data => {
                this.setState({products: data});
            });
    }

    renderProducts = () => {
        const categoryName = this.props.categoryName;
        return (this.state.products.map(product => (
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
                             className="card-img-top" alt="Laptop"/>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <p className="small"><Link to={""} className="text-muted">Laptops</Link></p>
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


    render() {
        return (
            <div>
                <section style={{backgroundColor: '#eee'}}>
                    <div className="container py-5">
                        <div className="row">
                            {this.renderProducts()}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const withRouteParams = (Component: React.ComponentType<ProductsProps>) => (props: any) => {
    const params = useParams<PathValue>();
    const navigate = useNavigate();

    return <Component {...props}
                      categoryName={params.categoryName}
                      navigate={navigate}/>
}

export default withRouteParams(Products);