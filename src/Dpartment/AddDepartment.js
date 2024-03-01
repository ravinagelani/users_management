
import React, { useState } from 'react';
import axios from 'axios';

const AddDepartment = ({ companyId, showModal, onDepartmentAdded }) => {
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    description: '',
    company_id: companyId // Assuming company_id is required for adding departments
  });

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
      const bakend_host = process.env.REACT_APP_BACKEND_HOST;
      const response = await axios.post(`${bakend_host}/api/departments/`, newDepartment);
      
      // let response_data = response_data.data.data.Departments
      // console.log("---response_data---", response_data.data.data.Departments)
      if (onDepartmentAdded) {
        onDepartmentAdded();
      }
      // Clear the form after submission
      setNewDepartment({
        name: '',
        description: '',
        company_id: companyId
      });
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  return (
      <div className="container"> 
    <div className="modal" style={{ display: showModal ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Department</h5>
            <button type="button" className="btn-close" onClick={onDepartmentAdded}></button>
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
     </div>
  );
};

export default AddDepartment;
