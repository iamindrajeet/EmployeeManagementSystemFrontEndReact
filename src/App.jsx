import "./App.css";
import EmployeeComponent from "./components/EmployeeComponent";
import FooterComponenet from "./components/FooterComponenet";
import HeaderComponent from "./components/HeaderComponent";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ListDepartmentComponent from "./components/ListDepartmentComponent";
import DepartmentComponent from "./components/DepartmentComponent";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* http://localhost:3000 */}
          <Route exact path="/" element={<ListEmployeeComponent />}></Route>
          {/* http://localhost:3000/employees */}
          <Route path="/employees" element={<ListEmployeeComponent />}></Route>
          {/* http://localhost:3000/add-employee */}
          <Route path="/add-employee" element={<EmployeeComponent />}></Route>
          {/* http://localhost:3000/edit-employee/id */}
          <Route
            path="/edit-employee/:employeeId"
            element={<EmployeeComponent />}
          ></Route>
          {/* http://localhost:3000/departments */}
          <Route
            path="/departments"
            element={<ListDepartmentComponent />}
          ></Route>
          {/* http://localhost:3000/add-department */}
          <Route
            path="/add-department"
            element={<DepartmentComponent />}
          ></Route>
          {/* http://localhost:3000/edit-department/id */}
          <Route
            path="/edit-department/:departmentId"
            element={<DepartmentComponent />}
          ></Route>
        </Routes>
        <FooterComponenet />
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
