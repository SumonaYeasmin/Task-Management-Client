import { createBrowserRouter } from "react-router-dom";
import Authentication from "../components/Authentication";
import Dashboard from "../components/Dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Authentication />
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>
    }
])
export default router;