import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddCompany = ({ onCompanyAdded }) => {
    const [company, setCompany] = useState({ name: '', location: '', about: '', type: '' });
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null); // Remove error message after 3 seconds
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
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
            let response_data = response.data
            console.log("---response_data---", response_data)
            if (response_data.status === 201) {
                // Pass the newly added company back to the parent component
                onCompanyAdded(response_data.data.Company);
                setCompany({ name: '', location: '', about: '', type: '' });
                setModalVisible(false);
                setError(null); // Clear any previous errors
                setTimeout(() => {
                    setError(null);
                }, 3000); // Hide the success message after 3 seconds
            }
        } catch (error) {
            let res = error.response.data.errors
            let err = Object.values(res).flat();
            console.error('Error adding company:', err);
            setError(err.join(',')); // Set the error message
        }
    };

    const handleChange = (e) => {
        setCompany({ ...company, [e.target.name]: e.target.value });
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setError(null); // Clear error message when closing modal
    };

    return (
        <div className="container my-3">

            <div className="text-end">
                <button type="button" className="btn btn-primary" onClick={openModal}>
                    Add Company
                </button>
            </div>

            {modalVisible && (
                <div className="modal fade show" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Company</h5>
                                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                            </div>
                            <div className={`alert ${error ? 'alert-danger' : 'd-none'}`} role="alert">
                                <strong> {error}</strong>
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
                                    <label htmlFor="type" className="form-label">Type</label>
                                        <select className="form-control" id="type" name="type" value={company.type} onChange={handleChange} required>
                                            <option value="">Select Type</option>
                                            <option value="IT">IT</option>
                                            <option value="Non-IT">Non-IT</option>
                                        </select>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                    <button type="submit" className="btn btn-primary" >Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddCompany;
