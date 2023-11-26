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
import PlaceOrderModal from "./modals/PlaceOrderModal";
import ToDoList from "./pages/ToDoList";
import TaskNotification from "./future/TaskNotification";
import Activity from "./components/Activity";
import AuthenticationModal from "./modals/AuthenticationModal";
import Invoice from "./pages/Invoice";
import PackedOrders from "./components/PackedOrders";
import PendingOrders from "./components/PendingOrders";

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
                            <Route path={"/login"} element={<AuthenticationModal/>}/>
                            <Route element={
                                <PrivateRoute component={AddProductModal} roles={["manager", "admin"]}>
                                    <AddProductModal/>
                                </PrivateRoute>
                            }/>
                            <Route path={"/order"} element={<PlaceOrderModal/>}/>
                            <Route path={"/tasks"} element={
                                <PrivateRoute component={Tasks} roles={["staff", "manager", "admin"]}>
                                    <Tasks/>
                                </PrivateRoute>}/>
                           {/* <Route path={"/notification" } element={<TaskNotification/>}/>*/}
                            <Route path={"/active" } element={<Activity/>}/>
                            <Route path="/:categoryName" element={<Products/>}/>
                            <Route path="/:categoryName/:productName" element={<SpecificProduct/>}/>
                            {/*<Route path={"/notification" } element={<PushNotificationComponent/>}/>*/}
                            <Route path={"/todo"} element={<ToDoList/>}/>
                            <Route path={"/todo/:uuid" } element={<Invoice/>}/>
                        </Routes>
                    </CartProvider>
                </RoleProvider>
            </LoadingProvider>
        </BrowserRouter>
        /*</div>*/
    );
}

export default App;
