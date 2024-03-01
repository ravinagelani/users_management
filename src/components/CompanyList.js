import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AddCompany from './AddCompany';
import EditCompany from './EditCompany';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faBuilding } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const CompanyList = () => {
  const { id } = useParams();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        let authToken = localStorage.getItem('token');
        const bakend_host = process.env.REACT_APP_BACKEND_HOST;
        const response = await axios.get(`${bakend_host}/api/companies/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          },
          withCredentials: true // Ensure CORS is enabled
        });
        let companiesArray = Array.isArray(response.data.data.Companies) ? response.data.data.Companies : [response.data.data];
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
    setCompanies([...companies, newCompany]);
  };

  // Delete data 
  const handleDelete = async (companyId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this company!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        let authToken = localStorage.getItem('token');
        const bakend_host = process.env.REACT_APP_BACKEND_HOST;
        await axios.delete(`${bakend_host}/api/companies/${companyId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          },
          withCredentials: true // Ensure CORS is enabled
        });
        setCompanies(companies.filter(company => company.id !== companyId));
        Swal.fire(
          'Deleted!',
          'Your company has been deleted.',
          'success'
        );
      }
    } catch (error) {
      console.error('Error deleting company:', error);
      Swal.fire(
        'Error!',
        'An error occurred while deleting the company.',
        'error'
      );
    }
  };

  // Handle edit functionality - You should replace this with your own edit logic
  const handleEdit = (companyId) => {
    // Your edit logic here
  };
  const handleCompanyUpdated = (updatedCompany) => {
    setCompanies(companies.map(company =>
      company.id === updatedCompany.id ? updatedCompany : company
    ));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="mt-3">
        <h1 className="text-center">Companies</h1>
        <hr />
        <AddCompany onCompanyAdded={handleCompanyAdded} setCompanies={setCompanies} />
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
              <th colSpan="3" className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {companies.filter(company => company.name !== '' && company.active).map((company, index) => (
              <tr key={index}>
                <td><Link to={`/companies/${company.id}`}>{company.id}</Link></td>
                <td>{company.name}</td>
                <td>{company.location}</td>
                <td>{company.about}</td>
                <td>{company.type}</td>
                <td>{company.created}</td>
                <td>{company.updated}</td>
                <td>{company.active ? 'Yes' : 'No'}</td>
                <td><EditCompany company={company} onUpdate={handleCompanyUpdated} /></td>
                <td><button className="btn btn-outline-danger" onClick={() => handleDelete(company.id)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button></td>
                <td>
                  <Link to={`/companies/${company.id}/departments`}>
                    <button className="btn btn-outline-primary">
                      <FontAwesomeIcon icon={faBuilding} />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default CompanyList;
