import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateDepartment = ({ department, companyId, onUpdate }) => {
  const [editedDepartment, setEditedDepartment] = useState({ ...department });
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setEditedDepartment(prevState => ({ ...prevState, [name]: value }));
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
    //   let response_data = response.data;
    //   console.log ('----', response_data.data.data.departments)
      onUpdate(updatedDepartment); // Pass the updated department data to the parent component
      setModalVisible(false);
      Swal.fire({
        title: 'Success!',
        text: 'Department updated successfully!',
        icon: 'success'
      });
    } catch (error) {
      console.error('Error updating department:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while updating the department. Please try again later.',
        icon: 'error'
      });
    }
  };

  const openModal = () => {
    setEditedDepartment({ ...department }); // Reset editedDepartment state when opening modal
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
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
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={editedDepartment.name} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={editedDepartment.description} onChange={handleChange} />
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