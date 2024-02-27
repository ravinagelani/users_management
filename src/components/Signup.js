import React, { useState, useEffect} from 'react';
import {Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const [usersignup, setUserSignup] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        password: "",
        password2: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         alert("Please fill the signup form first");
    //         navigate('/signup');
    //     }
    // }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("---validateForm()---", validateForm(),)
            if (validateForm()) {
                const bakend_host = process.env.REACT_APP_BACKEND_HOST;
                console.log(bakend_host);

                const response = await axios.post(`${bakend_host}/api/user/register/`, usersignup, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true // Ensure CORS is enabled
                });
                console.log(response.data);
                var response_data = response.data
                if (response_data.success) {
                    if (response_data.status === 201) {
                        // Form is valid, you can submit the data
                        localStorage.setItem('token', response_data.data.token.access)
                        console.log(" successfully:", response_data);
                        alert("signup successful!");
                        navigate('/login');
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
        setUserSignup({ ...usersignup, [name]: value });
        // Clear the error message when user starts typing again
        setErrors({ ...errors, [name]: "" });
    }

    const validateForm = () => {
        let valid = true;
        let errors = {};

        if (!usersignup.username.trim()) {
            errors.username = "User name is required";
            valid = false;
        }

        if (!usersignup.first_name.trim()) {
            errors.firstname = "First name is required";
            valid = false;
        }

        if (!usersignup.last_name.trim()) {
            errors.lastname = "Last name is required";
            valid = false;
        }
        if (!usersignup.email.trim()) {
            errors.email = "Email is required";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(usersignup.email)) {
            errors.email = "Email address is invalid";
            valid = false;
        }

        if (!usersignup.password.trim()) {
            errors.password = "Password is required";
            valid = false;
        } else if (usersignup.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
            valid = false;
        }
        if (usersignup.password !== usersignup.password2) {
            errors.password2 = "Passwords do not match";
            valid = false;
        }

        if (!usersignup.password2.trim()) {
            errors.password2 = "Please confirm your password";
            valid = false;
        }
        if (!usersignup.gender.trim()) {
            errors.gender = "Gender is required";
            valid = false;
        }

        setErrors(errors);
        return valid;
    }

    return (
        <div className="container mt-5 jumbotron">

            <form onSubmit={handleSubmit}>
                <div>
                    <h1 className="mb-4 ml-2 text-info text-center bg-white">Signup</h1>
                </div>
                <hr />
                <div className="form-group mt-4">
                    <label htmlFor="username" className="col-md-4 control-label">User Name:</label>
                    <div className="col-md-8">
                        <input value={usersignup.username}
                            onChange={handleChange}
                            type="text"
                            name="username"
                            placeholder="Enter user name"
                            id="username"
                            className="form-control" />
                        {errors.username && <p className="error">{errors.username}</p>}
                    </div>
                </div>
                <div className="form-group mt-4">
                    <label htmlFor="firstname" className="col-md-4 control-label">First Name:</label>
                    <div className="col-md-8">
                        <input
                            value={usersignup.firstname}
                            onChange={handleChange}
                            type="text"
                            name="first_name"
                            placeholder="Enter first name"
                            id="firstname"
                            className="form-control" />
                        {errors.firstname && <p className="error">{errors.firstname}</p>}
                    </div>
                </div>
                <div className="form-group mt-4">
                    <label htmlFor="lastname" className="col-md-4 control-label">Last Name:</label>
                    <div className="col-md-8">
                        <input
                            value={usersignup.lastname}
                            onChange={handleChange}
                            type="text"
                            name="last_name"
                            placeholder="Enter last name"
                            id="lastname"
                            className="form-control" />
                        {errors.lastname && <p className="error">{errors.lastname}</p>}
                    </div>
                </div>
                <div className="form-group mt-4">
                    <label htmlFor="email" className="col-md-4 control-label">Email:</label>
                    <div className="col-md-8">
                        <input
                            value={usersignup.email}
                            onChange={handleChange}
                            type="email"
                            name="email"
                            placeholder="youremail@gmail.com"
                            id="email"
                            className="form-control" />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                </div>
                <div className="form-group mt-4">
                    <label className="control-label col-md-4">Gender :</label>
                    <div className="col-sm-8">
                        <input type="radio" name="gender" value="M" onChange={handleChange} />
                        <label for="male">Male</label>
                        <input type="radio" name="gender" value="F" onChange={handleChange} />
                        <label for="female">Female</label>
                        {errors.gender && <p className="error">{errors.gender}</p>}
                    </div>
                </div>
                <div className="form-group mt-4">
                    <label htmlFor="password" className="col-md-4 control-label">Password:</label>
                    <div className="col-md-8">
                        <input
                            value={usersignup.password}
                            onChange={handleChange}
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            id="password"
                            className="form-control" />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                </div>
                <div className="form-group mt-4">
                    <label htmlFor="password" className="col-md-4 control-label">Confirm Password:</label>
                    <div className="col-md-8">
                        <input
                            value={usersignup.password2}
                            onChange={handleChange}
                            type="password"
                            name="password2"
                            placeholder="Confirm password"
                            id="password2"
                            className="form-control" />
                        {errors.password2 && <p className="error">{errors.password2}</p>}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-4" >Sign Up</button>
                <div>
                    <Link to="/login" className="link-btn mt-4">Already have an account? Login here.</Link>

                </div>
            </form>
        </div>
    )
}

export default Signup;
