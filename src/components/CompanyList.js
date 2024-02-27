import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import AddCompany from './AddCompany';
import EditCompany from './EditCompany';


const CompanyList = () => {
  const { id } = useParams();
  console.log('---id--', id)
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        let authToken = localStorage.getItem('token');
        const bakend_host = process.env.REACT_APP_BACKEND_HOST;
        console.log(bakend_host);
        const response = await axios.get(`${bakend_host}/api/companies/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          },
          withCredentials: true // Ensure CORS is enabled
        });
        console.log('API Response:', response.data); // Log the API response

        let companiesArray = [];
        let response_data = response.data
        if (Array.isArray(response_data.data.Companies)) {
          companiesArray = response_data.data.Companies;
        } else if (typeof response_data.data === 'object') {
          companiesArray = [response_data.data];
        } else {
          console.error('Received unexpected data format:', response_data.data);
        }

        setCompanies(companiesArray);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching companies:', error);
        if (error.response && error.response.status === 401) {
          console.log('Token expired or invalid, refreshing token...');
        } else {
          setLoading(false);
        }
      }
    };

    fetchCompanies();
  }, [id]);

  const handleCompanyAdded = (newCompany) => {
    // Add the newly created company to the list of companies
    setCompanies([...companies, newCompany]);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="mt-3">
        <h1 className="text-center">Companies</h1>
        <hr />
        <AddCompany onCompanyAdded={handleCompanyAdded} />
          <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Location</th>
              <th>About</th>
              <th>Type</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Active</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {
              companies.map((company, index) => {
                return <tr key={index}>
                  <td><Link to={`/companies/${company.id}`}>{company.id}</Link></td>
                  <td>{company.name}</td>
                  <td>{company.location}</td>
                  <td>{company.about}</td>
                  <td>{company.type}</td>
                  <td>{company.created}</td>
                  <td>{company.updated}</td>
                  <td>{company.active ? 'Yes' : 'No'}</td>
                  <td><EditCompany company={company} /></td>          
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyList;
