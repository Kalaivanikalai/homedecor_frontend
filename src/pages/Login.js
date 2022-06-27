import React, { useState } from "react";
import { useLoginMutation } from "../services/appApi";
import { Link } from "react-router-dom";
import {Alert } from "react-bootstrap";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isError, isLoading, error }] = useLoginMutation();

  function handleLogin(e) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <>
      <div className="login-wrap">
        <form className="login-html" onSubmit={handleLogin}>
          <input id="tab-1" type="radio" name="tab" className="sign-in" checked /><label for="tab-1" className="tab">Sign In</label>
          {isError && <Alert variant="danger">{error.data}</Alert>}

          <div className="login-form">
            <div className="sign-in-htm">
              <div className="group">
                <label for="user" className="label">Email Address</label>
                <input id="user" type="email" placeholder="Enter email" value={email} required onChange={(e) => setEmail(e.target.value)} className="input" />
              </div>
              <div className="group">
                <label for="pass" className="label">Password</label>
                <input id="pass" type="password" placeholder="Enter Password" value={password} required onChange={(e) => setPassword(e.target.value)} className="input" />
              </div>
              <div className="group">
                <button type="submit" className="button" disabled={isLoading}> Sign In </button>
              </div>
              <p className="pt-3 text-center">  Don't have an account? <Link to="/signup">Create account</Link></p>
              <div className="hr"></div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login;