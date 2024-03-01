// CompanyDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const CompanyDetails = () => {
  const { id } = useParams();
  console.log('-----id-----', id);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bakend_host = process.env.REACT_APP_BACKEND_HOST;
        console.log(bakend_host);
        const response = await axios.get(`${bakend_host}/api/companies/${id}`);
        setCompany(response.data.data.Company); // Assuming 'Company' is the key for company data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching company details:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!company) return <div>No company found for ID: {id}</div>;

  return (
      <div>
          <Navbar />
    <div className="container">
    <div className="mt-3">
      <h1>Company Details</h1>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td>ID</td>
            <td>{company.id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{company.name}</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>{company.location}</td>
          </tr>
          <tr>
            <td>About</td>
            <td>{company.about}</td>
          </tr>
          <tr>
            <td>Type</td>
            <td>{company.type}</td>
          </tr>
          <tr>
            <td>Created</td>
            <td>{company.created}</td>
          </tr>
          <tr>
            <td>Updated</td>
            <td>{company.updated}</td>
          </tr>
          <tr>
            <td>Active</td>
            <td>{company.active ? 'Yes' : 'No'}</td>
          </tr>
          <Link to={`/companies/${company.id}/departments`}>
          View Departments
        </Link>
        </tbody>
      </table>
    </div>
  </div>
  </div>
  );
};

export default CompanyDetails;
