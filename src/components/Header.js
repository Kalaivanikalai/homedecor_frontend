
import axios from "../axios";
import React, { useRef, useState } from "react";
import { Navbar, Button, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout, resetNotifications } from "../features/userSlice";


function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const bellRef = useRef(null);
  const notificationRef = useRef(null);
  const [bellPos, setBellPos] = useState({});

  function handleLogout() {
    dispatch(logout());
  }
  const unreadNotifications = user?.notifications?.reduce((acc, current) => {
    if (current.status === "unread") return acc + 1;
    return acc;
  }, 0);

  function handleToggleNotifications() {
    const position = bellRef.current.getBoundingClientRect();
    setBellPos(position);
    notificationRef.current.style.display = notificationRef.current.style.display === "block" ? "none" : "block";
    dispatch(resetNotifications());
    if (unreadNotifications > 0) axios.post(`/users/${user._id}/updateNotifications`);
  }

  return (
    <nav class="navbar">
      <div className="container">
        <div class="col-12 col-md-3">
          <LinkContainer to="/" className="navbar-header">
            <Navbar.Brand>Happiee Shoppiee</Navbar.Brand>
          </LinkContainer>
        </div>
        <div class="col-md-4 mt-4 mt-md-0">
          <Nav>
          {!user && (
                <LinkContainer to="/login" className="login_btn">
                  <Nav.Link  className="btn ml-4">Login</Nav.Link>
                </LinkContainer>
              )}


            {user && !user.isAdmin && (
              <LinkContainer to="/cart">
                <span id="cart" className="ml-3 fs-4">Cart
                  {user?.cart.count > 0 && (
                    <span className="ml-1" id="cart_count">{user.cart.count}</span>
                  )}
                </span>
              </LinkContainer>
            )}

            {user && (

              <>
                <Nav.Link style={{ position: "relative" }} onClick={handleToggleNotifications}>
                  <i className="fas fa-bell" ref={bellRef} data-count={unreadNotifications || null}></i>
                </Nav.Link>

                <div className="ml-4 dropdown d-inline">
                  <NavDropdown title={`${user.name}`}>

                    {user.isAdmin && (
                      <>
                        <li>
                          <LinkContainer to="/admin">
                            <NavDropdown.Item>Dashboard</NavDropdown.Item>
                          </LinkContainer>
                        </li>
                        <li>
                          <LinkContainer to="/new-product">
                            <NavDropdown.Item>Create Product</NavDropdown.Item>
                          </LinkContainer>
                        </li>
                      </>
                    )}
                    {!user.isAdmin && (
                      <>
                        <li>
                          <LinkContainer to="/cart">
                            <NavDropdown.Item>Cart</NavDropdown.Item>
                          </LinkContainer>
                        </li>
                        <li>
                          <LinkContainer to="/orders">
                            <NavDropdown.Item>My orders</NavDropdown.Item>
                          </LinkContainer>
                        </li>
                      </>
                    )}
                    <Button variant="danger" onClick={handleLogout} className="logout-btn text-center">
                      Logout
                    </Button>
                  </NavDropdown>
                </div>
              </>
            )}
          </Nav>
        </div>
      </div>

      <div className="notifications-container" ref={notificationRef} style={{ position: "absolute", top: bellPos.top + 30, left: bellPos.left, display: "none" }}>
        {user?.notifications.length > 0 ? (
          user?.notifications.map((notification) => (
            <>
            <p className={`notification-${notification.status}`}>
              {notification.message}
              <br />
              <span>{notification.time.split("T")[0] + " " + notification.time.split("T")[1]}</span>
            </p>
            <hr/>
            </>
          ))
        ) : (
          <p>No notifcations yet</p>
        )}
      </div>

      
    </nav>
  );
}

export default Header;
