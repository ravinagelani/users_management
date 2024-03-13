import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddEmployees from './AddEmployees';
import Navbar from '../components/Auth/Navbar';

const Employees = () => {
    const { companyId } = useParams();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('---companyid--', companyId)
        const fetchEmployees = async () => {
            try {
                let authToken = localStorage.getItem('token');
                const backend_host = process.env.REACT_APP_BACKEND_HOST;
                const response = await axios.get(`${backend_host}/api/company/${companyId}/employees/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`
                    },
                    withCredentials: true // Ensure CORS is enabled
                });
                setEmployees(response.data.data.employees);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching employees:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [companyId]);

    // const handleEmployeesAdded = (newEmployees) => {
    //     setEmployees([...employees, newEmployees]);
    // };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Navbar />
        <div className="container">
            <h1 className="text-center">Employees</h1>
            <hr />
            {/* <AddEmployees companyId={companyId} setEmployees={setEmployees} onEmployeesAdded={handleEmployeesAdded} /> */}
            <table className="table table-bordered mt-3">
                <thead className="table table-secondary">
                    <tr>
                        <th>Company</th>
                        <th>Department</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>About</th>
                        <th>Position</th>
                        <th>Created</th>
                        <th>Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.company}</td>
                            <td>{employee.department}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.address}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.about}</td>
                            <td>{employee.position}</td>
                            <td>{new Date(employee.created).toLocaleString()}</td>
                            <td>{new Date(employee.updated).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
        </div>
    );
};

export default Employees;
