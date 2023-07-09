import { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getDepartment, listDepartments } from "../services/DepartmentService";

const EmployeeComponenet = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    departmentId: "",
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    listDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  let { employeeId } = useParams();

  const validateForm = () => {
    let valid = true;

    let errorsCopy = { ...errors };

    const { firstName, lastName, email, departmentId } = { ...formData };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
      if (!isValidEmail(formData.email)) {
        errorsCopy.email = "Invalid email";
        valid = false;
      }
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    if (departmentId) {
      errorsCopy.department = "";
    } else {
      errorsCopy.department = "Select Department";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  const isValidEmail = (email) => {
    return email.includes("@");
  };

  const navigator = useNavigate();

  useEffect(() => {
    if (employeeId) {
      getEmployee(employeeId)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [employeeId]);

  const saveOrUpdateEmployee = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log(formData)
      if (employeeId) {
        updateEmployee(employeeId, formData)
          .then((response) => {
            toast.success("Employee Details Updated Successfully!!!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            navigator("/employees");

            // Reset form fields
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
            });
          })
          .catch((error) => {
            toast.error("Couldn't update Employee Details!!", {
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
        createEmployee(formData)
          .then((response) => {
            toast.success("Employee Details Added Successfully!!!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            navigator("/employees");

            // Reset form fields
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
            });
          })
          .catch((error) => {
            toast.error("Couldn't add Employee Details!!", {
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
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    //console.log(formData);
  };

  const pageTitle = () => {
    if (employeeId) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
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
                  <label className="form-label">First Name:</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.firstName ? "is-invalid" : ""
                    }`}
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter Employee First Name"
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback"> {errors.firstName} </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Last Name:</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.lastName ? "is-invalid" : ""
                    }`}
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter Employee Last Name"
                  />
                  {errors.lastName && (
                    <div className="invalid-feedback"> {errors.lastName} </div>
                  )}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    aria-describedby="emailHelp"
                    placeholder="Enter Employee Email"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We&apos;ll never share your email with anyone else.
                  </small>
                  {errors.email && (
                    <div className="invalid-feedback"> {errors.email} </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Select Department:</label>
                  <select
                    className={`form-control ${
                      errors.department ? "is-invalid" : ""
                    }`}
                    name = "departmentId"
                    value={formData.departmentId}
                    onChange={handleInputChange}
                  >
                    <option value="Select Department">Select Department</option>
                    {departments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.departmentName}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <div className="invalid-feedback">
                      {errors.department}{" "}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={saveOrUpdateEmployee}
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

export default EmployeeComponenet;
