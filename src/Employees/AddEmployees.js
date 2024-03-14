import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';

const AddEmployees = ({ departmentId, onEmployeesAdded }) => {
    const [newEmployee, setNewEmployee] = useState({ name: '', email: '', address: '', phone: '', about: '', position: '', });
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

    const handleSubmit = async e => {
        const queryParameters = new URLSearchParams(window.location.search);
        const companyId = queryParameters.get("companyId");
        e.preventDefault();
        try {
            let authToken = localStorage.getItem('token');
            console.log('companyId:', companyId);
            console.log('departmentId:', departmentId);
            console.log('New employee:', newEmployee);

            const backend_host = process.env.REACT_APP_BACKEND_HOST;
            const response = await axios.post(`${backend_host}/api/employees/`,
                { ...newEmployee, company_id: companyId, department_id: departmentId }, // Assign companyId and departmentId here
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`
                    },
                    withCredentials: true,
                }
            );
            let response_data = response.data;
            console.log("---response_data////---", response_data)
            console.log("---response_data:::::---", response_data.data.Employee)
            if (response.status === 201) {
                const newEmployeeData = response.data.data.Employee;
                // Reset form fields after successful submission
                onEmployeesAdded([newEmployeeData]);
                setNewEmployee({ name: '', email: '', address: '', phone: '', about: '', position: '', });
                setModalVisible(false);
                setError(null); // Clear any previous errors
                setTimeout(() => {
                    setError(null);
                }, 3000);

            }
        } catch (error) {
            let res = error.response.data.errors
            let err = Object.values(res).flat();
            console.error('Error adding employee:', err);
            setError(err);
        }
    };
    const handleChange = e => {
        const { name, value } = e.target;
        setNewEmployee(prevState => ({ ...prevState, [name]: value }));
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setError(null);
    };


    return (
        <div className="container-fluid">
            <div className="text-end">
                <button type="button" className="btn btn-primary" onClick={openModal}>
                    Add Employee
            </button>
            </div>
            {modalVisible && (
                <div className="modal fade show" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Employees</h5>
                                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                            </div>
                            <div className={`alert ${error ? 'alert-danger' : 'd-none'}`} role="alert">
                                <strong>{error}</strong> 
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
                                        <input type="number" className="form-control" id="phone" name="phone" value={newEmployee.phone} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="about" className="form-label">About</label>
                                        <textarea className="form-control" id="about" name="about" value={newEmployee.about} onChange={handleChange} required></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="position" className="form-label">Position</label>
                                        <select className="form-select" id="position" name="position" value={newEmployee.position} onChange={handleChange} required>
                                            <option value="">Select Position</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Software Developer">Software Developer</option>
                                            <option value="Project Leader">Project Leader</option>
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
