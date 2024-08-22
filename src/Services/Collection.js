import { deleteApi, getApi, patchApi, postApi, putApi } from "./Interceptor";

const Login = "employee/login";
const LeaveList = "leave/getLeavesCount";

const AddDepartment = "employee/createDepartment";
const DepartmentList = "employee/departmentList";
const AddEmployee = "employee/registerEmployee";
const EmployeeList = "employee/employeeList";
const AddLeave = "leave/createLeave";
const GetEmployeeRoleAll = "employee/getEmployeeByRole"
// post api
export const AdminLogin = (payload) => postApi(Login, payload);
export const AddDepartmentApi = (payload) => postApi(AddDepartment, payload);
export const AddEmployeeApi = (payload) => postApi(AddEmployee, payload);
export const AddLeaveApi = (payload) => postApi(AddLeave, payload);

// delete api

// get api
export const getEmployeeList = (query) => getApi(`${EmployeeList}?${query}`);
export const getDepartmentList = () => getApi(DepartmentList);
export const getLeaveCount = () => getApi(LeaveList);
export const getEmployeeByRole = (query) => getApi(`${GetEmployeeRoleAll}?${query}`);
