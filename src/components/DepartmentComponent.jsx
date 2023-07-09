import React, { useEffect, useState } from "react";
import { createDepartment, getDepartment, updateDepartment } from "../services/DepartmentService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { updateEmployee } from "../services/EmployeeService";

const DepartmentComponent = () => {
  const [departmentData, setDepartmentData] = useState({
    departmentName: "",
    departmentDescription: "",
  });

  const navigator = useNavigate();

  const { departmentId } = useParams();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDepartmentData({ ...departmentData, [name]: value });
  };

  useEffect(() => {
    if (departmentId) {
      getDepartment(departmentId)
        .then((response) => {
          setDepartmentData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const saveOrUpdateDepartment = (event) => {
    event.preventDefault();
    if (departmentId) {
      updateDepartment(departmentId, departmentData)
        .then((response) => {
          toast.success("Department Details Updated Successfully!!!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigator("/departments");
        })
        .catch((error) => {
          toast.error("Couldn't update Department Details!!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log(error);
        });
    } else {
      createDepartment(departmentData)
        .then((response) => {
          toast.success("Department Details Added Successfully!!!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigator("/departments");
        })
        .catch((error) => {
          toast.error("Couldn't add Department Details!!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log(error);
        });
    }
  };

  const pageTitle = () => {
    if (departmentId) {
      return <h2 className="text-center">Update Department</h2>;
    } else {
      return <h2 className="text-center">Add Department</h2>;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <div>
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Department Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="departmentName"
                    id="departmentName"
                    value={departmentData.departmentName}
                    onChange={handleInputChange}
                    placeholder="Enter Department Name"
                  />
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Department Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="departmentDescription"
                    id="departmentDescription"
                    value={departmentData.departmentDescription}
                    onChange={handleInputChange}
                    placeholder="Enter Department Description"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={saveOrUpdateDepartment}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentComponent;
