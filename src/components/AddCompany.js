import React, { useState } from 'react';
import axios from 'axios';

const AddCompany = () => {
    const [company, setCompany] = useState({ name: '', location: '', about: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to your backend endpoint
            let authToken = localStorage.getItem('token');
            const bakend_host = process.env.REACT_APP_BACKEND_HOST;
            const response = await axios.post(
  `${bakend_host}/api/companies/`,
                {
                    name: company.name,
                    location: company.location,
                    about: company.about,
                    type: company.type
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`
                    },
                    withCredentials: true,
                }
            );

            // Check if the request was successful
            if (response.status === 201) {
                // Reset the state after adding the company
                setCompany({ name: '', location: '', about: '', type: '' });
                alert('Company added successfully!');
            } else {
                // Handle the case where the request fails
                alert('Failed to add company. Please try again later.');
            }
        } catch (error) {
            console.error('Error adding company:', error);
            alert('An error occurred while adding the company. Please try again later.');
        }
    };

    const handleChange = (e) => {
        setCompany({ ...company, [e.target.name]: e.target.value });
    };

    return (
        <div className="container my-3">
            
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add Company
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Company</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" name="name" value={company.name} onChange={handleChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="location" className="form-label">Location</label>
                                    <input type="text" className="form-control" id="location" name="location" value={company.location} onChange={handleChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="about" className="form-label">About</label>
                                    <input type="text" className="form-control" id="about" name="about" value={company.about} onChange={handleChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="type" className="form-label">Type</label>
                                    <input type="text" className="form-control" id="type" name="type" value={company.type} onChange={handleChange} minLength={5} required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCompany;
