import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import 'bootstrap/dist/css/bootstrap.min.css';
import Authentication from "./pages/Authentication";
import PrivateRoute from "./routes/PrivateRoute";
import Tasks from "./pages/Tasks";
import SpecificProduct from "./pages/SpecificProduct";
import RoleProvider from "./context/RoleProvider";
import CartProvider from "./context/CartContext";
import LoadingProvider from "./context/LoadingContext";
import NavBar from "./components/NavBar";
function App() {
    return (
       /* <div style={{
            backgroundColor: '#eee', margin: '0',
            height: '100%'
        }}>*/
            <BrowserRouter>
                <LoadingProvider>
                    <RoleProvider>
                        <CartProvider>
                            <NavBar/>
                            <Routes>
                                <Route path={"/"} element={<Home/>}/>
                                <Route path={"/home"} element={<Home/>}/>
                                <Route path="/login" element={<Authentication/>}/>
                                <Route path={"/tasks"} element={
                                    <PrivateRoute component={Tasks} roles={["staff", "manager", "admin", "user"]}>
                                        <Tasks/>
                                    </PrivateRoute>}/>
                                <Route path="/:categoryName" element={<Products/>}/>
                                <Route path="/:categoryName/:productName" element={<SpecificProduct/>}/>
                                {/*<Route element={"CartModal"}/>*/}
                            </Routes>
                        </CartProvider>
                    </RoleProvider>
                </LoadingProvider>
            </BrowserRouter>
/*</div>*/
    );
}

export default App;
