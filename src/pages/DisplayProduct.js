import React from 'react'
import { Link } from 'react-router-dom'

function DisplayProduct({ _id, category, name, price, pictures }) {
    return (
        <Link to={`/product/${_id}`} classNameName="card">
            <div className="card" style={{ width: "18rem" }}>
                <img className="card-img-top" src={pictures[0].url} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title"> {name} </h5>
                        <p className="card-text"> ₹ {price} </p>
                        <button className="btn btn-primary">View Product</button>
                    </div>
            </div>
        </Link>



    )
}

export default DisplayProduct;
