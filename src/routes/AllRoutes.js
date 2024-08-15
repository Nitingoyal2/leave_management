import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "../layout/Layout";
import Dashboard from "../pages/dashboard/Dashboard";
import CreateDepartment from "../pages/department/addDepartment/AddDepartment";
import DepartmentList from "../pages/department/departmentList/DepartmentList";
import AddLeaveType from "../pages/leaveType/addLeaveType/AddLeaveType";
import LeaveTypeList from "../pages/leaveType/leaveTypeList/LeaveTypeList";

import AddEmployee from "../pages/employee/addEmployee/AddEmployee";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="departmentAdd" element={<CreateDepartment />} />
          <Route path="departmentList" element={<DepartmentList />} />
          <Route path="leaveTypeAdd" element={<AddLeaveType />} />
          <Route path="leaveTypeList" element={<LeaveTypeList />} />
          <Route path="employeeAdd" element={<AddEmployee />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AllRoutes;
