import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddEmployees = ({ companyId, departmentId, onEmployeesAdded }) => {
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        about: '',
        position: '',
    });

    const [modalVisible, setModalVisible] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setNewEmployee(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async e => {
        const queryParameters = new URLSearchParams(window.location.search);
        const companyId = queryParameters.get("companyId");
        if (!companyId) {
            console.error("Company ID is undefined.");
            // Handle the error or return early if necessary
            return;
        }
        e.preventDefault();
        try {
            let authToken = localStorage.getItem('token');
            console.log('companyId:', companyId);
            console.log('departmentId:', departmentId);
            console.log('New employee:', newEmployee); 

            const backend_host = process.env.REACT_APP_BACKEND_HOST;
            const response = await axios.post(`${backend_host}/api/employees/`,
                {...newEmployee, company_id: companyId, department_id: departmentId }, // Assign companyId and departmentId here
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`
                    },
                    withCredentials: true,
                }
            );
            
            let response_data = response.data;
            console.log("---response_data---", response_data)
            if (response.status === 201) {
                onEmployeesAdded(response_data.data.employees);
                // Reset form fields after successful submission
                setNewEmployee({
                    name: '',
                    email: '',
                    address: '',
                    phone: '',
                    about: '',
                    position: '',
                    // Do not need to reset company_id and department_id here
                });
                setModalVisible(false);
                Swal.fire({
                    title: 'Success!',
                    text: 'Employee added successfully!',
                    icon: 'success'
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add employee. Please try again later.',
                    icon: 'error'
                });
            }
        } catch (error) {
            console.error('Error adding employee:', error);
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while adding the employee.',
                icon: 'error'
            });
        }
    };
    

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };


    return (
        <div className="container-fluid">
           <button type="button" className="btn btn-primary" onClick={openModal}>
                Add Employee
        </button>

            {modalVisible && (
                <div className="modal fade show" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Employees</h5>
                                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="name" name="name" value={newEmployee.name} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" name="email" value={newEmployee.email} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input type="text" className="form-control" id="address" name="address" value={newEmployee.address} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input type="text" className="form-control" id="phone" name="phone" value={newEmployee.phone} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="about" className="form-label">About</label>
                                        <textarea className="form-control" id="about" name="about" value={newEmployee.about} onChange={handleChange} required></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="position" className="form-label">Position</label>
                                        <select className="form-select" id="position" name="position" value={newEmployee.position} onChange={handleChange} required>
                                            <option value="">Select Position</option>
                                            <option value={newEmployee.Manager}>Manager</option>
                                            <option value={newEmployee.Software_Developer}>Software Developer</option>
                                            <option value={newEmployee.Project_Leader}>Project Leader</option>
                                        </select>
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

export default AddEmployees;
