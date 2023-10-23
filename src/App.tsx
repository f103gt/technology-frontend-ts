import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Authentication from "./components/Authentication";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import Tasks from "./components/Tasks";
import SpecificProduct from "./components/SpecificProduct";

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
                        <Route path={"/tasks"} element={
                            <PrivateRoute component={Tasks} roles={["staff","manager","admin"]}>
                            <Tasks/>
                        </PrivateRoute>}/>
                        <Route path={"/:categoryName/*"} element={<Products/>}>
                            <Route path={":productName"} element={<SpecificProduct/>}/>
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
