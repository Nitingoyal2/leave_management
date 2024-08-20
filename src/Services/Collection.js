import { deleteApi, getApi, patchApi, postApi, putApi } from "./Interceptor";

const Login = "employee/login";
const AddDepartment = "employee/createDepartmen";
const DepartmentList = "employee/departmentList"
const AddEmployee = "employee/registerEmployee";
const EmployeeList = "employee/employeeList";
const AddLeave = "leave/createLeave"
// post api
export const AdminLogin = (payload) => postApi(Login, payload);
export const AddDepartmentApi = (payload) => postApi(AddDepartment, payload);
export const AddEmployeeApi = (payload) => postApi(AddEmployee, payload);
export const AddLeaveApi = (payload) => postApi(AddLeave, payload);


// delete api


// get api
export const getEmployeeList = () => getApi(EmployeeList);
export const getDepartmentList = () => getApi(DepartmentList)