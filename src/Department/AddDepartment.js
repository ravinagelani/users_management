import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Swal from 'sweetalert2';

const AddDepartment = ({ companyId, showModal, onDepartmentAdded }) => {
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    description: '',
    company_id: companyId
  });
  const [modalVisible, setModalVisible] = useState(showModal);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null); // Remove error message after 3 seconds
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);


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
        
          onDepartmentAdded(response.data.data.Department);
        
        setNewDepartment({
          name: '',
          description: '',
          company_id: companyId
        });
        closeModal();
        setError(null);
        setTimeout(() => {
          setError(null);
        }, 3000);
        //   Swal.fire({
        //     title: 'Success!',
        //     text: 'Department added successfully!',
        //     icon: 'success'
        //   });
        // } else {
        //   Swal.fire({
        //     title: 'Error!',
        //     text: 'Failed to add department. Please try again later.',
        //     icon: 'error'
        //   });
      }
    } catch (error) {
      let res = error.response.data.errors.non_field_errors;
      let err = Object.values(res).flat();
      console.error('Error adding department:', err);
      setError(err);
      // Swal.fire({
      //   title: 'Error!',
      //   text: 'An error occurred while adding the department.',
      //   icon: 'error'
      // });
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setError(null)
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
              <div className={`alert ${error ? 'alert-danger' : 'd-none'}`} role="alert">
                <strong>{error}</strong> 
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
