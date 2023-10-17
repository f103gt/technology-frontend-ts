import React, {Component} from 'react';
import UserContext from "./UserContext";
import {Link, useNavigate} from "react-router-dom";
import {getCookies} from "../utilities/CookiesUtil";
import axios from "axios";


interface Category {
    categoryName: string;
    childCategories: Category[];
}

interface NavBarProps {
    navigate: (path: string) => void;
}

interface NavBarState {
    categories: Category[];
}

class NavBar extends Component<NavBarProps, NavBarState> {
    constructor(props: NavBarProps) {
        super(props);
        this.state = {
            categories: [],
        };
    };

    componentDidMount() {
        axios.get("/csrf/api/v1")
            .then(response => {
                const csrfToken = response.data.headers;
                fetch("/api/v1/all-categories", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    }
                })
                    .then(res => res.json())
                    .then(result => {
                        console.log(result);
                        this.setState({categories: result});
                        console.log(this.state.categories);
                    });
            })

    }


    //TODO implement formatting for /categoryName url
    // if the url is represented with only one word- make all the letter lower case
    // if the url has multiple parts make them look like represented below
    // smartphone and mobile-phone

    renderCategories = (categories: Category[]) => {
        return (
            <ul>
                {categories.map(category => {
                    if (category.childCategories.length > 0) {
                        return (
                            <li className="dropend" key={category.categoryName}>
                                <span className="dropdown-item dropdown-toggle" role="button"
                                      data-bs-toggle="dropdown" id="sub-dropdown-menu"
                                      data-bs-auto-close="outside">
                                    {category.categoryName}
                                </span>
                                <ul className="dropdown-menu" aria-labelledby="sub-dropdown-menu">
                                    {category.childCategories.map(childCategory => (
                                        <li key={childCategory.categoryName}>
                                            <Link className="dropdown-item"
                                                  to={`/${childCategory.categoryName}`}
                                                  onClick={() => this.props.navigate(`/${childCategory.categoryName}`)}>
                                                {childCategory.categoryName}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        );
                    } else {
                        return (
                            <li key={category.categoryName}>
                                <Link className="dropdown-item" to={`/${category.categoryName}`}
                                      onClick={() => this.props.navigate(`/${category.categoryName}`)}>
                                    {category.categoryName}
                                </Link>
                            </li>
                        );
                    }
                })}
            </ul>
        );
    };


    render() {
        const userRole = getCookies("userRole");
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Navbar</Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/home">Home</Link>
                                </li>
                                <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle"
                                      data-bs-auto-close="outside"
                                      id="navbarDropdown" role="button"
                                      data-bs-toggle="dropdown" aria-expanded="false">
                                    Products
                                </span>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">{
                                        this.renderCategories(this.state.categories)
                                    }
                                    </ul>
                                </li>
                            </ul>
                            <form className="d-flex">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"/>
                                <button className="btn btn-outline-success" type="submit">
                                    Search
                                </button>
                            </form>
                            <div>
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    {userRole ?
                                        (<li className="nav-item">
                                            <Link className="nav-link" to="/logout">Logout</Link>
                                        </li>)
                                        :
                                        (<li className="nav-item">
                                            <Link className="nav-link" to="/login">Login</Link>
                                        </li>)}

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/cart">Cart</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

NavBar.contextType = UserContext;

const withNavigation = (Component: any) => {
    return (props: any) => {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate}/>;
    };
}
export default withNavigation(NavBar);