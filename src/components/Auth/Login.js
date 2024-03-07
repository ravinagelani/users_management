import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
    const [userlogin, setUserlogin] = useState({
        email_or_username: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (validateForm()) {
                const bakend_host = process.env.REACT_APP_BACKEND_HOST;
                const response = await axios.post(`${bakend_host}/api/user/login/`, userlogin, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                const responseData = response.data;
                if (responseData.success) {
                    localStorage.setItem('token', responseData.data.token.access);
                    // Swal.fire({
                    //     title: "Success!",
                    //     text: "Login successful!",
                    //     icon: "success",
                    //     confirmButtonText: "OK"
                    // }).then(() => {
                        navigate('/');
                    // });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: responseData.message || "Login failed",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            Swal.fire({
                title: "Error!",
                text: "The username you entered doen't appear to belong in your Account",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserlogin({ ...userlogin, [name]: value });
        setErrors({ ...errors, [name]: "" });
    }

    const validateForm = () => {
        let valid = true;
        let errors = {};

        if (!userlogin.email_or_username.trim()) {
            errors.email_or_username = "Email is required";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(userlogin.email_or_username)) {
            errors.email_or_username = "Email address is invalid";
            valid = false;
        }

        if (!userlogin.password.trim()) {
            errors.password = "Password is required";
            valid = false;
        }

        setErrors(errors);
        return valid;
    }

    return (
        <div className="container">
            <form className="signup-form mt-5" onSubmit={handleSubmit}>
                <h2>Log In</h2>
                <hr />
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <div className="col-md-8">
                        <input
                            value={userlogin.email}
                            onChange={handleChange}
                            type="email"
                            name="email_or_username"
                            placeholder="youremail@gmail.com"
                            id="email"
                            className="form-control" />
                        {errors.email_or_username && <p className="error">{errors.email_or_username}</p>}
                    </div>
                </div>
                <div className="form-group mt-4">
                    <div className="col-md-8">
                        <label htmlFor="password">Password:</label>
                        <input
                            value={userlogin.password}
                            onChange={handleChange}
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            id="password"
                            className="form-control" />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary mt-3">Log In</button>
                </div>
                <div>
                    <Link to="/signup" className="text-center">You don't have an account? Signup here.</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
