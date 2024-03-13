import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import AddDepartment from './AddDepartment';
import UpdateDepartment from './UpdateDepartment'; // Import UpdateDepartment component
import Navbar from '../components/Auth/Navbar';

const Departments = () => {
  const { companyId } = useParams();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [companyNotFound, setCompanyNotFound] = useState(false);


  useEffect(() => {
    console.log('---companyID', companyId)
    const fetchDepartments = async () => {
      try {
        const backend_host = process.env.REACT_APP_BACKEND_HOST;
        const response = await axios.get(`${backend_host}/api/company/${companyId}/department`);
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
  }, [companyId]);

  const handleDepartmentAdded = (newDepartment) => {
    setDepartments([...departments, newDepartment]);
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


  const handleupdatedDepartment = (updatedDepartment) => {
    setDepartments(departments.map(dep =>
      dep.id === updatedDepartment.id ? updatedDepartment : dep
    ));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="text-center">Departments</h1>
        <hr />
        <AddDepartment companyId={companyId} setDepartments={setDepartments} onDepartmentAdded={handleDepartmentAdded} />
        <table className="table table-bordered mt-3">
          <thead className="table table-secondary">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Created</th>
              <th>Updated</th>
              <th colSpan="2" className="text-center">Action</th>
              <th>Employees</th>
            </tr>
          </thead>
          <tbody>
            {companyNotFound ? (
              <tr>
                <td colSpan="7" className="text-center"><b>Company not found</b></td>
              </tr>
            ) : (
                <>
                  {departments.map(department => (
                    <tr key={department.id}>
                      <td>{department.name}</td>
                      <td>{department.description}</td>
                      <td>{department.created}</td>
                      <td>{department.updated}</td>
                      <td>
                        {department && (
                          <UpdateDepartment department={department} companyId={companyId} onUpdate={handleupdatedDepartment} />
                        )}
                      </td>
                      <td>
                        <button className="btn btn-outline-danger" onClick={() => handleDelete(department.id)}>
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </td>
                      <td>
                        <Link to={`/departments/${department.id}/employees?companyId=${companyId}`} className="btn btn-outline-primary">
                          <FontAwesomeIcon icon={faUsers} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </>
              )}
          </tbody>
        </table>  
      </div>
    </div>
  );
};

export default Departments;
