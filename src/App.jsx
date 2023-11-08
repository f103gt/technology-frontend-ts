import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from "./routes/PrivateRoute";
import Tasks from "./pages/Tasks";
import SpecificProduct from "./pages/SpecificProduct";
import RoleProvider from "./context/RoleProvider";
import CartProvider from "./context/CartContext";
import LoadingProvider from "./context/LoadingContext";
import NavBar from "./components/NavBar";
import AddProductModal from "./modals/AddProductModal";
import AddCategoryModal from "./modals/AddCategoryModal";
import PlaceOrderModal from "./modals/PlaceOrderModal";

function App() {
    return (
            <BrowserRouter>
                <LoadingProvider>
                    <RoleProvider>
                        <CartProvider>
                            <NavBar/>
                            <Routes>
                                <Route path={"/"} element={<Home/>}/>
                                <Route path={"/home"} element={<Home/>}/>
                                <Route element={
                                    <PrivateRoute component={AddProductModal} roles={["manager","admin"]}>
                                        <AddProductModal/>
                                    </PrivateRoute>
                                }/>
                                <Route path={"/order"} element={<PlaceOrderModal/>}/>
                                <Route path={"/tasks"} element={
                                    <PrivateRoute component={Tasks} roles={["staff", "manager", "admin"]}>
                                        <Tasks/>
                                    </PrivateRoute>}/>
                                <Route path="/:categoryName" element={<Products/>}/>
                                <Route path="/:categoryName/:productName" element={<SpecificProduct/>}/>
                            </Routes>
                        </CartProvider>
                    </RoleProvider>
                </LoadingProvider>
            </BrowserRouter>
/*</div>*/
    );
}

export default App;
