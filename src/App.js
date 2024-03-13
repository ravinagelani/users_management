import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Home from './components/Auth/Home.js';
import Companies from './components/Companies/Companies.js';
import CompanyList from './components/Companies/CompanyList';
import CompanyDetails from './components/Companies/CompanyDetails';
import Departments from './Department/Departments';
import Employees from './Employees/Employees'; 
import DepartmentEmployees from './Department/DepartmentEmployees'; 
import AddEmployees from './Employees/AddEmployees';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if a valid token is present 
    const token = localStorage.getItem('token');
    console.log("-----token----", token)
    if (token) {
      // If the token is valid, set isAuthenticated to true
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
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
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/:id" element={<CompanyDetails />} />
          <Route path="/companies/:companyId/departments" element={<Departments />} />
          <Route path="/companies/:companyId/employees" element={<Employees />} />
          <Route path="/departments/:departmentId/employees" element={<DepartmentEmployees />} />
          <Route path="/companies/:companyId/departments/:departmentId/employees" element={<AddEmployees />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
