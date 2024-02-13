import React, { useState } from 'react';

const Signup = (props) => {
    const [usersignup, setUserSignup] = useState ({
        firstname: "",
        lastname: "",
        username: "",
        email: ""
    })

    const handleSubmit = (e) => {
       const name = e.target.name;
       const value = e.target.value;
       console.log (name, value)

        setUserSignup({...usersignup, [name] : value})
    }

    return (
        <div className="auth-form-container">
            <form className="signup-form" >
                <h2>Signup</h2>
                <label htmlFor="firstname">First Name :-</label>
                <input 
                    value={usersignup.firstname}
                    onChange={handleSubmit}
                    type="text" 
                    name="firstname"
                    placeholder="Enter first name" 
                    id="firstname" />
                <label htmlFor="lastnamer">Last Name :-</label>
                <input
                    value={usersignup.lastname}
                    onChange={handleSubmit}
                    type="text"
                    name="lastname"
                    placeholder="Enter Last name" 
                    id="lastname"/>
                <label htmlFor="username">User Name :-</label>
                <input
                    value={usersignup.username}
                    onChange={handleSubmit}
                    type="text"
                    name="username"
                    placeholder="Enter user name"
                    id="username" />
                <label htmlFor="email">Email :-</label>
                <input
                    value={usersignup.email}
                    onChange={handleSubmit}
                    type="email"
                    placeholder="youremail@gmail.com"
                    id="email"
                    name="email" />
                {/* <label htmlFor="gender">Gender:</label> */}
                {/* <select name="gender">
                    <option value="">Select gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                </select> */}
                <button type="submit">Register</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Already have an account? Register here.</button>
        </div>

    )
}

export default Signup
