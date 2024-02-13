
import React, { useState } from 'react';

const Register = (props) => {

    const [email, setEmail] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

  return (
    <div className="auth-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Signup</h2>
                <label htmlFor="firstname">First Name :-</label>
                <input type="text" name="firstname" placeholder="Enter first name" />
                <label htmlFor="lastnamer">Last Name :-</label>
                <input type="text" name="lastname" placeholder="Enter Last name" />
                <label htmlFor="username">User Name :-</label>
                <input type="text" name="username" placeholder="Enter user name" />
                <label htmlFor="email">Email :-</label>
                <input  type="email" name="email" placeholder="Enter your valid email" />
                <label htmlFor="gender">Gender:</label>
                <select name="gender">
                    <option value="">Select gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                </select>
                <button type="submit">Register</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Already have an account? Register here.</button>
        </div>
  )
}

export default Register
