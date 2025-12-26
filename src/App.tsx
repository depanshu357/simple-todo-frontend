import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {index: true, element: <Navigate to="/login" replace />},
      {path: "/login", element: <PublicRoute><Login /></PublicRoute>},
      {path: "/signup", element: <PublicRoute><Signup /></PublicRoute>},
      {path: "/dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute>}
    ]
  }
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
