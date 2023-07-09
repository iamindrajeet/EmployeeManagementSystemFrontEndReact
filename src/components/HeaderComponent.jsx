import React from "react";
import { Link, NavLink } from 'react-router-dom'

const HeaderComponent = () => {
  return (
    <div>
      <header>
        <nav
          className="navbar navbar-expand-lg bg-dark border-bottom border-bottom-dark"
          data-bs-theme="dark"
        >
          <Link className="navbar-brand" to="/employees">
            Employee Management System
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item ">
                <NavLink className = "nav-link" to = "/employees">Employees</NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className = "nav-link" to = "/departments">Departments</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
