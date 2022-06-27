
import './App.css';
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { addNotification } from "./features/userSlice";

import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Signup from './pages/Signup';
import ViewProduct from "./pages/ViewProduct";
import AllCategories from "./pages/AllCategories";
import Cart from "./pages/Cart";
import UserOrders from "./pages/UserOrders";

import AddProducts from "./admin/AddProducts";
import Dashboard from "./admin/Dashboard";
import Editpro from "./admin/Editpro";




function App() {

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const socket = io("https://homedecor-mern.herokuapp.com");
        socket.off("notification").on("notification", (msgObj, user_id) => {
            if (user_id === user._id) {
                dispatch(addNotification(msgObj));
            }
        });

        socket.off("new-order").on("new-order", (msgObj) => {
            if (user.isAdmin) {
                dispatch(addNotification(msgObj));
            }
        });
    }, []);

    return (
        <>
 <div className="App">
      <Router>
        <Header/>
        
        <Routes>
            <Route index element={<Home />} />
            {!user && (
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </>
            )}

            {user && (
                <>
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/orders" element={<UserOrders />} />
                </>
            )}
            {user && user.isAdmin && (
                <>
                    <Route path="/admin" element={<Dashboard />} />
                    <Route path="/product/:id/edit" element={<Editpro />} />
                </>
            )}
            <Route path="/product/:id" element={<ViewProduct />} />
            <Route path="/category/:category" element={<AllCategories />} />

            <Route path="/new-product" element={<AddProducts />} />
            <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
        </>
    );
}

export default App;
