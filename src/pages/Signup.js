import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Alert } from "react-bootstrap";
import { useSignupMutation } from "../services/appApi";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [signup, { error, isLoading, isError }] = useSignupMutation();

    function handleSignup(e) {
        e.preventDefault();
        signup({ name, email, password });
    }

    return (
        <>
            <div className="login-wrap">
                <form className="login-html" onSubmit={handleSignup}>
                    <input id="tab-2" type="radio" name="tab" className="sign-up" />
                    <label for="tab-2" className="tab">Sign Up</label>
                    <div className="login-form">
                    {isError && <Alert variant="danger">{error.data}</Alert>}
                        <div className="sign-up-htm">
                            <div className="group">
                                <label for="user" className="label">Username</label>
                                <input id="user"  type="text" placeholder="Your name" value={name} required onChange={(e) => setName(e.target.value)} className="input" />
                            </div>
                            <div className="group">
                                <label for="pass" className="label">Email Address</label>
                                <input id="pass" placeholder="Enter email" value={email} required onChange={(e) => setEmail(e.target.value)} className="input" />
                            </div>
                            <div className="group">
                                <label for="pass" className="label">Password</label>
                                <input id="pass" placeholder="Enter Password" value={password} required onChange={(e) => setPassword(e.target.value)} className="input" data-type="password" />
                            </div>
                            <div className="group">
                                <button type="submit" className="button" disabled={isLoading}> Sign Up </button>
                            </div>
                            <p className="pt-3 text-center">
                                Don't have an account? <Link to="/login">Login</Link>{" "}
                            </p>
                            <div className="hr"></div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup;