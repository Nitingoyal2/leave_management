import AllRoutes from "./routes/AllRoutes";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./auth/Login";
function App() {
  return (
    <>
      <ToastContainer />
      <AllRoutes />
      {/* <Login /> */}
    </>
  );
}

export default App;
