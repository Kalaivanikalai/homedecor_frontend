import axios from "../axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SimilarProduct from "../components/SimilarProduct";
import { LinkContainer } from "react-router-bootstrap";
import { useAddToCartMutation } from "../services/appApi";
import ToastMessage from "../components/ToastMessage";

function ViewProduct() {

    const { id } = useParams();
    const user = useSelector((state) => state.user);
    const [product, setProduct] = useState(null);
    const [similar, setSimilar] = useState(null);
    const [addToCart, { isSuccess }] = useAddToCartMutation();

    const handleDragStart = (e) => e.preventDefault();
    useEffect(() => {
        axios.get(`/products/${id}`).then(({ data }) => {
            setProduct(data.product);
            setSimilar(data.similar);
        });
    }, [id]);

    if (!product) {
        return <Loading />;
    }
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };

    const images = product.pictures.map((picture) => <img classNameName="product__carousel--image" src={picture.url} onDragStart={handleDragStart} />);

    let similarProducts = [];
    if (similar) {
        similarProducts = similar.map((product, idx) => (
            <div classNameName="item" data-value={idx}>
                <SimilarProduct {...product} />
            </div>
        ));
    }

    return (
        <>
            <div className="container container-fluid">
                <div className="row d-flex justify-content-around ">
                    <div className="col-12 col-lg-5 img-fluid" id="product_image">
                        <AliceCarousel mouseTracking items={images} controlsStrategy="alternate" />
                    </div>
                    <div className="col-12 col-lg-5 mt-5">
                        <h3> {product.name} </h3>
                        <p id="product_id">Product ID : {product._id} </p>
                        <hr />
                        <p id="product_price"> ₹ {product.price}</p>
                        {user && !user.isAdmin && (

                            <>
                                <div className="stockCounter d-inline">
                                    <span className="btn btn-danger minus">-</span>
                                    <input type="number" className="form-control count d-inline" readonly="" value="1" />
                                    <span className="btn btn-success plus">+</span>
                                </div>
                                <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" onClick={() => addToCart({ userId: user._id, productId: id, price: product.price, image: product.pictures[0].url })}>
                                    Add to Cart
                                </button>
                            </>

                        )}
                        <hr />
                        <p>Status: <span id="stock_status" className="greenColor">In Stock</span></p>
                        <hr />
                        <h4 className="mt-2">Description:</h4>
                        <p> {product.description} </p>
                        <hr />
                        {user && user.isAdmin && (
                            <LinkContainer to={`/product/${product._id}/edit`}>
                                <button type="button" className="btn btn-primary d-inline ml-4">Edit Product</button>
                            </LinkContainer>
                        )}
                        {isSuccess && <ToastMessage bg="info" title="Added to cart" body={`${product.name} is in your cart`} />}

                        {/* <p id="product_seller mb-3">by: <strong> Malika Design</strong></p> */}
                        {/* <div className="alert alert-danger mt-5" type="alert">Login to post your review.</div> */}

                    </div>
                </div>

                <div className="my-4">
                <h2>Similar Products</h2>
                <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <AliceCarousel mouseTracking items={similarProducts} responsive={responsive} controlsStrategy="alternate" />
                </div>
            </div>
            
            </div>
        </>
    )
}

export default ViewProduct;
