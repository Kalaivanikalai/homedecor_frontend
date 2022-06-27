import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useSelector } from "react-redux";
import Checkout from "../components/Checkout";
import { useIncreaseCartProductMutation, useDecreaseCartProductMutation, useRemoveFromCartMutation } from "../services/appApi";

const stripePromise = loadStripe("pk_test_51L1QNoSJC3WHYyYcyikhIxsa44ZE6dZXSUAny6Z5GcG3q0yMG439joCzjQMcNDlSvkduKeZfCDQ271zWrWTBGUd100XAY5dZyJ");

function Cart() {
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products);
    const userCartObj = user.cart;
    let cart = products.filter((product) => userCartObj[product._id] != null);
    const [increaseCart] = useIncreaseCartProductMutation();
    const [decreaseCart] = useDecreaseCartProductMutation();
    const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

    function handleDecrease(product) {
        const quantity = user.cart.count;
        if (quantity <= 0) return alert("Can't proceed");
        decreaseCart(product);
    }
  return (
    <div class="container container-fluid cart-container mt-5">
      {cart.length === 0 ? (
        <h2 className="mt-5">Your Cart: <b>{cart.length} items</b></h2>
      ) : (
        <Elements stripe={stripePromise}>
          <Checkout />
        </Elements>
      )}
      <div class="row d-flex justify-content-between">
        <div class="col-12 col-lg-8">
          {cart.map((item) => (
            <>
              <hr />
              <div class="cart-item">
                <div class="row">
                  <div class="col-4 col-lg-3">
                  <img src={item.pictures[0].url} alt="Laptop" height="90" width="115" />
                  </div>
                  <div class="col-5 col-lg-3"> {item.name}  </div>
                  <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                    <p id="card_item_price"> ₹ {item.price} </p>
                  </div>
                  <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                    <div class="stockCounter d-inline">
                    <span className="btn btn-danger minus" onClick={() => handleDecrease({ productId: item._id, price: item.price, userId: user._id })}>-</span>
                    <input type="number" className="form-control count d-inline text-center" value={user.cart[item._id]} readOnly />
                    <span className="btn btn-primary plus" onClick={() => increaseCart({ productId: item._id, price: item.price, userId: user._id })}>+</span>

                    </div>
                  </div>
                  <div class="col-4 col-lg-1 mt-4 mt-lg-0">
                  {!isLoading && <i id="delete_cart_item" class="fa fa-trash btn btn-danger" onClick={() => removeFromCart({ productId: item._id, price: item.price, userId: user._id })} aria-hidden="true">
                    </i>}
                  </div>
                </div>
              </div>
              <hr/>
            </>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
        <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>Est. total: <span className="order-summary-values"> ₹ {user.cart.total}</span></p>
            {/* <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Check out</button> */}
        </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;
