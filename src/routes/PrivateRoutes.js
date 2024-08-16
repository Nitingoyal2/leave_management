import CreateDepartment from "../pages/department/addDepartment/AddDepartment";
import Dashboard from "../pages/dashboard/Dashboard";
import DepartmentList from "../pages/department/departmentList/DepartmentList";
import AddLeaveType from "../pages/leaveType/addLeaveType/AddLeaveType";
import LeaveTypeList from "../pages/leaveType/leaveTypeList/LeaveTypeList";

import AddEmployee from "../pages/employee/addEmployee/AddEmployee";
import EmployeeList from "../pages/employee/employeeList/EmployeeList";
import LeaveList from "../pages/leave/leaveList/LeaveList";
import LeavePending from "../pages/leave/leavePending/LeavePending";
import LeaveApproved from "../pages/leave/leaveApproved/LeaveApproved";
import LeaveRejected from "../pages/leave/leaveRejected/LeaveRejected";
export const PrivateRoutes = [
  { path: "dashboard", element: <Dashboard /> },
  { path: "departmentAdd", element: <CreateDepartment /> },
  { path: "departmentList", element: <DepartmentList /> },
  { path: "leaveTypeAdd", element: <AddLeaveType /> },
  { path: "leaveTypeList", element: <LeaveTypeList /> },
  { path: "employeeAdd", element: <AddEmployee /> },
  { path: "employeeList", element: <EmployeeList /> },
  { path: "leaveList", element: <LeaveList /> },
  { path: "leavePending", element: <LeavePending /> },
  { path: "leaveApproved", element: <LeaveApproved /> },
  { path: "leaveRejected", element: <LeaveRejected /> },
  //   { path: "*", element: <PageNotFound /> }, // Catch-all route for 404
];
