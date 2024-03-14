import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import UpdateEmployees from '../Employees/UpdateEmployees.js'
import AddEmployees from '../Employees/AddEmployees.js';
import Navbar from '../components/Auth/Navbar';

const DepartmentEmployees = () => {
    const { companyId, departmentId } = useParams();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search)
        const companyId = queryParameters.get("companyId")
        console.log('---Company ID:----', companyId); // Log companyId here
        console.log('--deparmentId:--', departmentId);

        const fetchEmployees = async () => {
            try {
                let authToken = localStorage.getItem('token');
                const backend_host = process.env.REACT_APP_BACKEND_HOST;
                const response = await axios.get(`${backend_host}/api/department/${departmentId}/employee`, {
                    params: {
                        companyId: companyId
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`
                    },
                    withCredentials: true // Ensure CORS is enabled

                });
                console.log('----response=>', response.data.data.Employees)
                setEmployees(response.data.data.Employees);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching employees:', error);
                setLoading(false);
            }
        };
        fetchEmployees();
    }, [companyId, departmentId]);

    // const handleEmployeesAdded = (newEmployees) => {
    //     console.log('---', newEmployees);
    //     setEmployees([...employees, newEmployees]);

    // };

    const handleEmployeesAdded = (newEmployees) => {
        try {
            // Ensure newEmployees is an array
            if (!Array.isArray(newEmployees)) {
                throw new Error('New employees must be provided in an array format.');
            }

            // Update the employees state by concatenating new employees
            setEmployees(prevEmployees => [...prevEmployees, ...newEmployees]);
            console.log('New employees added:', newEmployees);
        } catch (error) {
            console.error('Error adding new employees:', error);
        }
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
                console.log('--delete--', response);
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
        console.log('---', updatedEmployee);
        setEmployees(employees.map(emp =>
            emp.id === updatedEmployee.id ? updatedEmployee : emp

        ));
        console.log('....', employees.map);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <Navbar />
            <div className="container-fluid">
                <h2 className="text-center mt-4">Employees in this Department</h2>
                <hr />
                <AddEmployees companyId={companyId} departmentId={departmentId} setEmployees={setEmployees} onEmployeesAdded={handleEmployeesAdded} />
                <table className="table table-bordered border-dark mt-3">
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
                            {/* <th>Created</th>
                        <th>Updated</th> */}
                            <th colSpan="2" className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            employees.map(employee => (
                                <tr key={employee.id}>
                                    <td>{employee.name || "N/A"}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.address}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.about}</td>
                                    <td>{employee.position}</td>
                                    <td>{employee.department.company.name}</td>
                                    <td>{employee.department.name}</td>
                                    <td>
                                        <UpdateEmployees employee={employee} companyId={companyId} onUpdate={handleupdatedEmployee} />
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-danger" onClick={() => handleDelete(employee.id)}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">No employees found</td>
                                </tr>
                            )}
                    </tbody>

                </table>
            </div>
        </div>

    );
};

export default DepartmentEmployees;
