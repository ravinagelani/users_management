
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

    const [userlogin, setUserlogin] = useState({
        email_or_username: "",
        password: ""
    })
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is already authenticated (e.g., token present in local storage)
        const token = localStorage.getItem('token');
        if (token) {
            // If token is present, navigate to the home page
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("---validateForm()---", validateForm(),)
            if (validateForm()) {
                const bakend_host = process.env.REACT_APP_BACKEND_HOST;
                console.log(bakend_host);

                const response = await axios.post(`${bakend_host}/api/user/login/`, userlogin, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true // Ensure CORS is enabled
                });
                console.log("--response.data---:", response.data);
                var response_data = response.data
                if (response_data.success) {
                    if (response_data.status === 201) {
                        // Form is valid, you can submit the data
                        localStorage.setItem('token', response_data.data.token.access)
                        console.log(" successfully:", response_data);
                        navigate('/');
                    }
                }
                else {
                    console.log(response)
                }
            }

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserlogin({ ...userlogin, [name]: value });
        // Clear the error message when user starts typing again
        setErrors({ ...errors, [name]: "" });
    }

    const validateForm = () => {
        let valid = true;
        let errors = {};
        console.log("--userlogin--", userlogin)
        if (!userlogin.email_or_username.trim()) {
            errors.email = "Email is required";
            console.log("---email---val")
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(userlogin.email_or_username)) {
            console.log("---email---invalid")
            errors.email_or_username = "Email address is invalid";
            valid = false;
        }

        if (!userlogin.password.trim()) {
            console.log("---password---val")
            errors.password = "Password is required";
            valid = false;
        } /*else if (userlogin.password.length < 6) {
            console.log("---password---val--length")
            errors.password = "Password must be at least 6 characters";
            valid = false;
        }*/

        setErrors(errors);
        return valid;
    }

    return (
        <div className="container">
            <form className="signup-form  mt-5" onSubmit={handleSubmit} >
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
                        {errors.email && <p className="error">{errors.email}</p>}
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

    )
}


export default Login
