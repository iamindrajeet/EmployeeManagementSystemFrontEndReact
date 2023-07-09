import React, { useEffect, useState } from "react";
import { deleteDepartment, listDepartments } from "../services/DepartmentService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ListDepartmentComponent = () => {
  const [departments, setDepartments] = useState([]);

  const navigator = useNavigate();

  const getAllDepartments = () => {
    listDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllDepartments();
  }, []);

  const addNewDepartment = () => {
    navigator('/add-department');
  };

  const updateDepartment = (departmentId) => {
    navigator(`/edit-department/${departmentId}`)
  }

  const removeDepartment = (departmentId) => {
    deleteDepartment(departmentId).then((response) => {
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
      getAllDepartments();
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
      getAllDepartments();
    });
  }

  return (
    <div>
      <h2 className="text-center">List of Departments</h2>
      <button
        type="button"
        className="btn btn-primary mb-2"
        onClick={addNewDepartment}
      >
        Add Department
      </button>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Department Id</th>
            <th>Department Name</th>
            <th>Department Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td> {department.id} </td>
              <td> {department.departmentName} </td>
              <td> {department.departmentDescription} </td>
              <td>
                <button type="button" className="btn btn-info" onClick={() => updateDepartment(department.id)}>
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                  onClick={() => removeDepartment(department.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDepartmentComponent;
