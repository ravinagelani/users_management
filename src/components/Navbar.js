import React from 'react'
import { useNavigate,Link } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear token from local storage
        localStorage.removeItem('token');
        // Navigate to the signup page
        navigate('/login');
    };
    return (
        <div>
            <div>
                <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Home</Link>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/companies" >companies</Link>
                            </li>
                        </ul>
                        <button onClick={handleLogout} className="btn btn-outline-success" type="submit" >Log out</button>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar
