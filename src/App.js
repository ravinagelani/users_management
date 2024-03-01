import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom' 
import React, { useState, useEffect } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Companies from './components/Companies';
import CompanyList from './components/CompanyList';
import CompanyDetails from './components/CompanyDetails';
import Departments from '/Users/imac/Documents/ravina/react/users-management/src/Dpartment/Departments.js'



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if a valid token is present (e.g., in local storage)
    const token = localStorage.getItem('token');
    console.log("-----token----", token)
    if (token) {
      // If the token is valid, set isAuthenticated to true
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('token');
    // Update isAuthenticated to false
    setIsAuthenticated(false);
    // Redirect to signup page
    return <Navigate to="/login" />;
  };

  return (
    <Router>
      <div>
        <Routes>
          {/* Conditional redirect to the home page */}
          <Route
            path="/" element={isAuthenticated ? <Home logout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/companies" element={<Companies />} ></Route>
          <Route path="/companies" element={<CompanyList />} ></Route>
          <Route path="/companies/:id" element={<CompanyDetails/>} ></Route>
          <Route path="/companies/:id/departments" element={<Departments />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
