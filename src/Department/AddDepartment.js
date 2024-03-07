import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddDepartment = ({ companyId, showModal, onDepartmentAdded }) => {
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    description: '',
    company_id: companyId
  });
  const [modalVisible, setModalVisible] = useState(showModal);

  const handleChange = e => {
    const { name, value } = e.target;
    setNewDepartment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const backend_host = process.env.REACT_APP_BACKEND_HOST;
      const response = await axios.post(`${backend_host}/api/departments/`, newDepartment);

      if (response.status === 201) {
        if (onDepartmentAdded) {
          onDepartmentAdded(response.data.data.Department);
        }
        setNewDepartment({
          name: '',
          description: '',
          company_id: companyId
        });
        closeModal();
        Swal.fire({
          title: 'Success!',
          text: 'Department added successfully!',
          icon: 'success'
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add department. Please try again later.',
          icon: 'error'
        });
      }
    } catch (error) {
      console.error('Error adding department:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while adding the department.',
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
    <div className="container">
      <div className="text-end">
      <button type="button" className="btn btn-primary" onClick={openModal}>
        Add Department
      </button>
      </div>
      {modalVisible && (
        <div className="modal" style={{ display: modalVisible ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Department</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={newDepartment.name} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={newDepartment.description} onChange={handleChange} required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDepartment;
