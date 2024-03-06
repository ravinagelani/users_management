import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import UpdateEmployees from '/Users/imac/Documents/ravina/react/users-management/src/Employees/UpdateEmployees.js'
import AddEmployees from '/Users/imac/Documents/ravina/react/users-management/src/Employees/AddEmployees.js';

const DepartmentEmployees = () => {
    const { companyId, departmentId } = useParams();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search)
        const companyId = queryParameters.get("companyId")
        console.log('---Company ID:----', companyId); // Log companyId here
        console.log('--deparmentId--', departmentId);
        const fetchEmployees = async () => {
            try {
                const backend_host = process.env.REACT_APP_BACKEND_HOST;
                const response = await axios.get(`${backend_host}/api/department/${departmentId}/employee`, {
                    params: {
                        companyId: companyId
                    }
                });
                setEmployees(response.data.data.Employees);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching employees:', error);
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [companyId, departmentId]);

    const handleEmployeesAdded = (newEmployees) => {
        setEmployees([...employees, newEmployees]);
    };

    const handleDelete = async (employeeId) => {
        // Show confirmation dialog using SweetAlert
        const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this employee data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        });

        // If user confirms deletion
        if (confirmation.isConfirmed) {
            try {
                const backend_host = process.env.REACT_APP_BACKEND_HOST;
                const response = await axios.delete(`${backend_host}/api/employees/${employeeId}`);

                // Remove the deleted employee from the state
                setEmployees(employees.filter(employee => employee.id !== employeeId));
                await Swal.fire('Deleted!', 'Employee data has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting employee:', error);
                // Show error message
                await Swal.fire('Error!', 'Failed to delete employee data.', 'error');
            }
        }
    };

    const handleupdatedEmployee = (updatedEmployee) => {
        setEmployees(employees.map(emp =>
          emp.id === updatedEmployee.id ? updatedEmployee : emp
        ));
      };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container-fluid">
            <h2 className="text-center mt-4">Employees in this Department</h2>
            <hr />
            <AddEmployees companyId={companyId} departmentId={departmentId} setEmployees={setEmployees} onEmployeesAdded={handleEmployeesAdded} />
            <table className="table table-bordered border-dark mt-5">
                <thead className="table table-secondary border-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>About</th>
                        <th>Position</th>
                        <th>Company</th>
                        <th>Department</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th colSpan="2" className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(employees) && employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.address}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.about}</td>
                            <td>{employee.position}</td>
                            <td>{employee.company}</td>
                            <td>{employee.department}</td>
                            <td>{employee.created}</td>
                            <td>{employee.updated}</td>
                            <td>
                                <UpdateEmployees employee={employee} companyId={companyId} onUpdate={setEmployees} />
                            </td>
                            <td>
                                <button className="btn btn-outline-danger" onClick={() => handleDelete(employee.id)} >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DepartmentEmployees;
