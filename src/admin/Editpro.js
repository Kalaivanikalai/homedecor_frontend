import React, { useEffect, useState } from "react";
import { Alert} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation } from "../services/appApi";
import axios from "../axios";

function Editpro() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();
    const [updateProduct, { isError, error, isLoading, isSuccess }] = useUpdateProductMutation();

    useEffect(() => {
        axios
            .get("/products/" + id)
            .then(({ data }) => {
                const product = data.product;
                setName(product.name);
                setDescription(product.description);
                setCategory(product.category);
                setImages(product.pictures);
                setPrice(product.price);
            })
            .catch((e) => console.log(e));
    }, [id]);

    function handleRemoveImg(imgObj) {
        setImgToRemove(imgObj.public_id);
        axios
            .delete(`/images/${imgObj.public_id}/`)
            .then((res) => {
                setImgToRemove(null);
                setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
            })
            .catch((e) => console.log(e));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !description || !price || !category || !images.length) {
            return alert("Please fill out all the fields");
        }
        updateProduct({ id, name, description, price, category, images }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        });
    }

    function showWidget() {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "dpibcktwd",
                uploadPreset: "u9dplieh",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    }

    return (
    <div className="container container-fluid mt-5">
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={handleSubmit}>
                    <h1 className="mt-4">Edit product</h1>
                    {isSuccess && <Alert variant="success">Product updated</Alert>}
                    {isError && <Alert variant="danger">{error.data}</Alert>}

                    <div className="form-group">
                        <label for="product_name">Product name</label>
                        <input type="text" className="form-control" placeholder="Enter product name" value={name} required onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label for="description">Product Description</label>
                        <input className="form-control" as="textarea" placeholder="Product description" value={description} required onChange={(e) => setDescription(e.target.value)}   />
                    </div>
                    <div className="form-group">
                        <label for="Price">Price (₹)</label>
                        <input className="form-control" type="number" placeholder="Price (₹)" value={price} required onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="form-group" onChange={(e) => setCategory(e.target.value)}>
                        <label for="Category">Category</label>
                            <select value={category} className="form-control">
                                <option disabled selected> -- Select One -- </option>
                                <option value="decorative_mirrors">Decorative Mirrors</option>
                                <option value="wall_clocks">Wall Clocks</option>
                                <option value="wall_shelves">Wall Shelves</option>
                                <option value="metal_wall_art">Metal Wall Art</option>
                                <option value="lamps_lighting">Lamps and Lighting</option>
                                <option value="hanging_planters">Hanging Planters</option>
                            </select>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary" type="button"  onClick={showWidget}> Upload Images</button>
                        <div className="images-preview-container">
                        {images.map((image) => (
                            <div className="image-preview">
                                <img src={image.url} alt="" />
                                {imgToRemove !== image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                            </div>
                        ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <button type="submit" disabled={isLoading || isSuccess} className="btn btn-success py-3">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}

export default Editpro;
