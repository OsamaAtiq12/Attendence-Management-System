import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './Login';
import Signup from './SignUp';
import Userdetail from './Userdetail';
 import Dashboard from './Dashboard';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Register",
    element: <Signup />,
  },
  {
    path: "/Home",
    element: <Dashboard />, 
  },
  {
    path: "/Userdetail",
    element: <Userdetail />,
  }
  
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>
);
