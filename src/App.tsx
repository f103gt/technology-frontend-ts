import React, {Component, useContext} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Authentication from "./pages/Authentication";
import NavBar from "./components/NavBar";
import PrivateRoute from "./routes/PrivateRoute";
import Tasks from "./pages/Tasks";
import SpecificProduct from "./pages/SpecificProduct";
import RoleProvider, {RoleContext} from "./context/RoleProvider";


function App() {

    const userRole = useContext(RoleContext);
    return (
        // eslint-disable-next-line react/jsx-no-undef
        <RoleProvider>
            <BrowserRouter>
                <div>
                    <NavBar/>
                    <Routes>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"/home"} element={<Home/>}/>
                        <Route path="/login" element={<Authentication/>}/>
                        <Route path={"/tasks"} element={
                            <PrivateRoute component={Tasks} roles={["staff", "manager", "admin","user"]}>
                                <Tasks/>
                            </PrivateRoute>}/>
                        <Route path="/:categoryName" element={<Products/>}/>
                        <Route path="/:categoryName/:productName" element={<SpecificProduct/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </RoleProvider>
    );

}

export default App;
