import { deleteApi, getApi, patchApi, postApi, putApi } from "./Interceptor";

const Login = "login";
const EmployeeList = "employeeList";
// post api
export const AdminLogin = (payload) => postApi(Login, payload);


// get api
export const getEmployeeList = () => getApi(EmployeeList);