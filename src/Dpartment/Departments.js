import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import AddDepartment from './AddDepartment';
import UpdateDepartment from './UpdateDepartment'; // Import UpdateDepartment component

const Departments = () => {
  const { id } = useParams();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [companyNotFound, setCompanyNotFound] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const backend_host = process.env.REACT_APP_BACKEND_HOST;
        const response = await axios.get(`${backend_host}/api/company/${id}/department`);
        if (response.data.data.Departments.length === 0) {
          setCompanyNotFound(true);
        } else {
          setDepartments(response.data.data.Departments);
        }
        console.log(response.data.data.Departments)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [id]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDepartmentAdded = () => {
    toggleModal();
  };

  const handleDelete = async (departmentId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this department!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        // Send delete request
        const backend_host = process.env.REACT_APP_BACKEND_HOST;
        await axios.delete(`${backend_host}/api/departments/${departmentId}`);
        
        // Update UI
        setDepartments(departments.filter(department => department.id !== departmentId));
        
        Swal.fire(
          'Deleted!',
          'Your department has been deleted.',
          'success'
        );
      }
    } catch (error) {
      console.error('Error deleting department:', error);
      Swal.fire(
        'Error!',
        'An error occurred while deleting the department.',
        'error'
      );
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1 className="text-center">Departments</h1>
      <hr />
      <button onClick={toggleModal} className="btn btn-primary mb-3">Add Departments</button>
      <AddDepartment companyId={id} showModal={showModal} onDepartmentAdded={handleDepartmentAdded} />
      {companyNotFound ? (
        <div className="text-center"><b>Company not found</b></div>
      ) : (
        <table className="table table-bordered mt-5">
          <thead className="table table-secondary">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Created</th>
              <th>Updated</th>
              <th colSpan="2" className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map(department => (
              <tr key={department.id}>
                <td>{department.name}</td>
                <td>{department.description}</td>
                <td>{department.created}</td>
                <td>{department.updated}</td>
                <td>
                  {/* Uncomment and integrate UpdateDepartment component */}
                  <UpdateDepartment department={department} companyId={id} onUpdate={(updatedDepartment) => {
                    const updatedDepartments = departments.map(dep => (dep.id === updatedDepartment.id ? updatedDepartment : dep));
                    setDepartments(updatedDepartments);
                  }} />
                </td>
                <td>
                  <button className="btn btn-outline-danger" onClick={() => handleDelete(department.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Departments;
