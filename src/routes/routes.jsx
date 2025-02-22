import { createBrowserRouter } from "react-router-dom";
import Authentication from "../components/Authentication";
import Dashboard from "../components/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Authentication />
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>
    }
])
export default router;