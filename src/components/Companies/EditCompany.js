import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditCompany = ({ company, onUpdate }) => {
  const [editedCompany, setEditedCompany] = useState(company);
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    setEditedCompany(company);
  }, [company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCompany(prevState => ({ ...prevState, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      let authToken = localStorage.getItem('token');
      const backend_host = process.env.REACT_APP_BACKEND_HOST;
      const response = await axios.patch(
        `${backend_host}/api/companies/${editedCompany.id}`,
        editedCompany,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          },
          withCredentials: true,
        }
      );
      let response_data = response.data;
      console.log("---response_data---", response_data);
      onUpdate(response_data.data); // updated company
      setModalVisible(false);
      Swal.fire({
        title: 'Success!',
        text: 'Company updated successfully!',
        icon: 'success'
      });
    } catch (error) {
      console.error('Error updating company:', error);
      alert('An error occurred while updating the company. Please try again later.');
    }
  };

  const openModal = () => {
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
                <h5 className="modal-title" id="exampleModalLabel">Edit Company</h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={editedCompany.name} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" className="form-control" id="location" name="location" value={editedCompany.location} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="about" className="form-label">About</label>
                    <input type="text" className="form-control" id="about" name="about" value={editedCompany.about} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="type" className="form-label">Type</label>
                    <input type="text" className="form-control" id="type" name="type" value={editedCompany.type} onChange={handleChange} />
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

export default EditCompany;
