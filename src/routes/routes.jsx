import { createBrowserRouter } from "react-router-dom";
import Authentication from "../components/Authentication";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Authentication />
    },
    {
        path: '/dashboard',
        element: <h1>Dashboard</h1>
    }
])
export default router;