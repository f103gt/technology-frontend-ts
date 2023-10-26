import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
const NavigationBar = () => {
    const [categories, setCategories] = useState([]);
    const [userState, setUserState] = useState(null);
    const navigation = useNavigate();
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        fetch("/api/v1/all-categories", {
            method: "GET"
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setCategories(result);
            });
    }, []);


    const renderCategories = (categories) => {
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
                                                  onClick={() => {
                                                      navigation(`/${childCategory.categoryName}`);
                                                  }}>
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
                                      onClick={() => navigation(`/${category.categoryName}`)}>
                                    {category.categoryName}
                                </Link>
                            </li>
                        );
                    }
                })}
            </ul>
        );
    };


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
                                    renderCategories(categories)
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
                                {username ?
                                    (<li className="nav-item">
                                        <Link className="nav-link" to="/account">{username}</Link>
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
};

export default NavigationBar;