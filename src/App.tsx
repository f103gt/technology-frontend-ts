import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Authentication from "./components/Authentication";
import NavBar from "./components/NavBar";

class App extends Component {
    render() {
        return (
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
        );
    }
}

export default App;
