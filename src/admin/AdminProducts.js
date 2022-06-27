
import React from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../services/appApi";
import Pagination from "../components/Pagination";

function AdminProducts() {

    const products = useSelector((state) => state.products);
    const user = useSelector((state) => state.user);

    const [deletProduct, { isLoading, isSuccess }] = useDeleteProductMutation();
    function handleDeleteProduct(id) {
        if (window.confirm("Are you sure?")) deletProduct({ product_id: id, user_id: user._id });
    }

    function TableRow({ pictures, _id, name, price }) {
        return (
            <tr>
                <td style={{width:"25%"}}>
                    <img src={pictures[0].url} className="dashboard-product-preview" alt="" style={{width:"20%"}}/>
                </td>
                <td>{_id}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td>
                    <i class="fa fa-trash" aria-hidden="true" onClick={() => handleDeleteProduct(_id, user._id)} disabled={isLoading}></i>
                    <Link to={`/product/${_id}/edit`}>
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                    </Link>
                </td>
            </tr>
        );
    }

    return (

        <>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Product Images  </th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th> Action </th>
                </tr>
            </thead>
            <tbody>
            <Pagination data={products} RenderComponent={TableRow} pageLimit={1} dataLimit={5} tablePagination={true} />
            </tbody>
        </Table>

        
       
        </>
    );
}

export default AdminProducts;
