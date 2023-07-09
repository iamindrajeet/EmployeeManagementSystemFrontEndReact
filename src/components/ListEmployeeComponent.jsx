import { useEffect, useState } from "react";
import { listEmployees, deleteEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = () => {
    listEmployees()
      .then((response) => setEmployees(response.data))
      .catch((error) => console.log(error));
  }
  
  const addNewEmployee = () => {
      navigator('/add-employee');
  }

  const updateEmployee = (employeeId) => {
    navigator(`/edit-employee/${employeeId}`);
  }

  const removeEmployee = (employeeId) => {
    deleteEmployee(employeeId).then((response) => {
      toast.success("Employee Details Deleted Successfully!!!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getAllEmployees();
    })
    .catch((error) => {
      toast.error("Couldn't delete Employee Details!!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getAllEmployees();
    });
  }

  return (
    <div>
      <h2 className="text-center">List of Employees</h2>
      <button type="button" className="btn btn-primary mb-2" onClick={addNewEmployee}>Add Employee</button>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td> {employee.id} </td>
              <td> {employee.firstName} </td>
              <td> {employee.lastName} </td>
              <td> {employee.email} </td>
              <td>
              <button type="button" className="btn btn-info" onClick={() => updateEmployee(employee.id)}>Update</button>
              <button type="button" className="btn btn-danger" onClick={() => removeEmployee(employee.id)} style={{marginLeft: '10px'}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
