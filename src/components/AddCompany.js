import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddCompany = ({ onCompanyAdded }) => {
    const [company, setCompany] = useState({ name: '', location: '', about: '', type: '' });
    const [modalVisible, setModalVisible] = useState(false);

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
                Swal.fire({
                    title: 'Success!',
                    text: 'Company added successfully!',
                    icon: 'success'
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add company. Please try again later.',
                    icon: 'error'
                });
            }
        } catch (error) {
            console.error('Error adding company:', error);
             Swal.fire({
                title: 'Error!',
                text: 'companies with this name already exists',
                icon: 'error'
            });
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
    };

    return (
        <div className="container my-3">
            
            <button type="button" className="btn btn-primary" onClick={openModal}>
                Add Company
            </button>

            {modalVisible && (
                <div className="modal fade show" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Company</h5>
                                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
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
