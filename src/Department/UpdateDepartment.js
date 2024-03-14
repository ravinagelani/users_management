import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Swal from 'sweetalert2';

const UpdateDepartment = ({ department, companyId, onUpdate }) => {
  const [editedDepartment, setEditedDepartment] = useState({ ...department });
  const [modalVisible, setModalVisible] = useState(false);
  const [inputError, setInputError] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
        const timer = setTimeout(() => {
            setError(null); // Remove error message after 5 seconds
        }, 5000);

        return () => clearTimeout(timer);
    }
}, [error]);

  const handleChange = e => {
    const { name, value } = e.target;
    setEditedDepartment(prevState => ({ ...prevState, [name]: value }));
    setInputError(prevState => ({ ...prevState, [name]: value.trim() === '' }));
  };
  const handleUpdate = async () => {
    try {
      const authToken = localStorage.getItem('token');
      const backend_host = process.env.REACT_APP_BACKEND_HOST;
      const updatedDepartment = { ...editedDepartment, company_id: companyId }; // Include company_id in the request payload
      const response = await axios.patch(
        `${backend_host}/api/departments/${editedDepartment.id}`,
        updatedDepartment,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          },
          withCredentials: true,
        }
      );
        console.log('---',response);
      onUpdate(updatedDepartment); // Pass the updated department data to the parent component
      setModalVisible(false);
      setError(null); // Clear any previous errors
      setTimeout(() => {
        setError(null);
      }, 5000); 
      // Swal.fire({
      //   title: 'Success!',
      //   text: 'Department updated successfully!',
      //   icon: 'success'
      // });
  
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const { name, description } = error.response.data.errors;
        // Construct error message
        const errorMessage = [
          ...(name || []).map(msg => `Name: ${msg}`),
          ...(description || []).map(msg => `Description: ${msg}`)
        ].join(',');
        console.error('Error updating department:', errorMessage);
        setError(errorMessage);
      } else {
        console.error('Error updating department:', error);
        setError('An unexpected error occurred.');
      }
      // Swal.fire({
      //   title: 'Error!',
      //   text: 'A department with this name already exists in the company.',
      //   icon: 'error'
      // });
    }
  };
  

  const openModal = () => {
    setEditedDepartment({ ...department }); // Reset editedDepartment state when opening modal
    setInputError({});
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setError(null)
  };

  return (
    <div>
      <button type="button" className="btn btn-outline-primary" onClick={openModal}>
        Edit
      </button>
      {modalVisible && (
        <div className="modal fade show" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Department</h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
            <div className={`alert ${error ? 'alert-danger' : 'd-none'}`} role="alert">
                <strong> {error}</strong>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={editedDepartment.name} onChange={handleChange} required/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={editedDepartment.description} onChange={handleChange} required />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateDepartment;
