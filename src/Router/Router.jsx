import * as React from "react";


import {
  createBrowserRouter,
} from "react-router-dom";
import UserManagement from "../UserManagement/UserManagement";
import RoleManagement from "../RoleManagement/RoleManagement";
import PermissionManagement from "../PermissionsManagement/PermissionsManagement";
import Header from "../Header/Header";
import Layout from "../Layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/", // Default route
        element: <UserManagement />,
      },
      {
        path: "/roles",
        element: <RoleManagement />,
      },
      {
        path: "/permissions",
        element: <PermissionManagement />,
      },
    ],
  }
]);
export default router;