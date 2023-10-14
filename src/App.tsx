import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import Authenticate from "./components/Authenticate";
import NavigationBar from "./components/NavigationBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import UserProvider from "./components/UserProvider";
import Authentication from "./components/Authentication";
import NavBar from "./components/NavBar";

class App extends Component {
    render() {
        return (
            <UserProvider>
                <BrowserRouter>
                    <div>
                        <NavBar/>
                        <Routes>
                            <Route path={"/"} element={<Home/>}/>
                            <Route path={"/home"} element={<Home/>}/>
                            <Route path="/login" element={<Authentication/>}/>
                            <Route path={"/:categoryName/*"} element={<Products/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </UserProvider>
        );
    }
}

export default App;
