import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import Layout from "../layout/Layout";

function PublicRoute({ isAuthenticated }) {
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

function PrivateRoute({ isAuthenticated }) {
  return !isAuthenticated ? (
    <Navigate to="/" replace />
  ) : (
    <Layout>
      <Outlet />
    </Layout>
  );
}

const renderRoutes = (routes) => {
  return routes.map(({ path, element, children }) => (
    <Route key={path} path={path} element={element}>
      {children && children.length > 0 && renderRoutes(children)}
    </Route>
  ));
};

export default function AllRoutes() {
  const token = useSelector((state) => state?.Authlogin?.data?.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute isAuthenticated={!!token} />}>
          {renderRoutes(PublicRoutes)}
        </Route>

        <Route element={<PrivateRoute isAuthenticated={!!token} />}>
          {renderRoutes(PrivateRoutes)}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
