
import axios from "../axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import categories from "../categories";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import DisplayProduct from "../pages/DisplayProduct";

function Home() {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const lastProducts = products.slice(0, 8);
    useEffect(() => {
        axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
    }, []);
    return (
        <>
            <div className="container mt-5">
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://i.imgur.com/Pvj70oA.jpg" className="d-block w-100" alt="" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://i.imgur.com/whLqlgt.jpg" className="d-block w-100" alt="" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://i.imgur.com/2gsx7We.jpg" className="d-block w-100" alt="" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                {/* Product Category  */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="title text-center">
                            <h2>Product Category</h2>
                        </div>
                    </div>
                    {categories.map((category) => (
                        <div className="col-md-4">
                            <div className="category-box">
                                <Link to={`/category/${category.name.toLocaleLowerCase()}`}>
                                    <p style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`, gap: "10px" }} className="category-tile">
                                        <h3>{category.name}</h3>
                                    </p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Latest Products  */}

                <div id="cards_landscape_wrap-2">
                    <div className="container">
                        <div className="row">
                            <div className="title text-center">
                                <h2> Latest Products</h2>
                            </div>
                            {lastProducts.map((product) => (
                            <div className="col-xs-12 col-sm-5 col-md-5 col-lg-4">
                                    <DisplayProduct {...product} />
                            </div>
                             ))}
                        </div>
                    </div>
                </div>

                <Link to="/category/all" style={{ textAlign: "right"}} className="btn btn-danger"> Show All 
               &nbsp; <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </Link>

            </div>
        </>
    )
}

export default Home;
