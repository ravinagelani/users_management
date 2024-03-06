import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateEmployee = ({ employee, companyId, onUpdate }) => {
    const [editedEmployee, setEditedEmployee] = useState({ ...employee });
    const [modalVisible, setModalVisible] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setEditedEmployee(prevState => ({ ...prevState, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            const authToken = localStorage.getItem('token');
            const backend_host = process.env.REACT_APP_BACKEND_HOST;
            const updatedEmployee = { ...editedEmployee, company_id: companyId };
            await axios.patch(
                `${backend_host}/api/employees/${editedEmployee.id}`,
                updatedEmployee,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`
                    },
                    withCredentials: true,
                }
            );
            onUpdate(updatedEmployee);
            setModalVisible(false);
            Swal.fire({
                title: 'Success!',
                text: 'Employee updated successfully!',
                icon: 'success'
            });
        } catch (error) {
            console.error('Error updating employee:', error);
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while updating the employee. Please try again later.',
                icon: 'error'
            });
        }
    };

    const openModal = () => {
        setEditedEmployee({ ...employee });
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <div className="container">
            <button type="button" className="btn btn-primary" onClick={openModal}>
                Edit
            </button>

            {modalVisible && (
                <div className="modal fade show" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Employee</h5>
                                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                            </div>
                            <form onSubmit={handleUpdate}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="name" name="name" value={editedEmployee.name} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" name="email" value={editedEmployee.email} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input type="text" className="form-control" id="address" name="address" value={editedEmployee.address} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input type="text" className="form-control" id="phone" name="phone" value={editedEmployee.phone} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="about" className="form-label">About</label>
                                        <textarea className="form-control" id="about" name="about" value={editedEmployee.about} onChange={handleChange} required></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="position" className="form-label">Position</label>
                                        <select className="form-select" id="position" name="position" value={editedEmployee.position} onChange={handleChange} required>
                                            <option value="">Select Position</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Software Developer">Software Developer</option>
                                            <option value="Project Leader">Project Leader</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                    <button type="submit" className="btn btn-primary" >Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateEmployee;
