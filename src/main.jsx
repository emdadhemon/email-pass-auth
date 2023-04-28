
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './assets/components/main';
import Login from './assets/components/Login/Login';
import Register from './assets/components/Register/Register';
import RegisterRBS from './assets/components/RegisterRBS/RegisterRBS';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children : [
      {
        path : '/login',
        element : <Login></Login>
      },
      {
        path : "/register",
        element : <Register></Register>
      },
      {
        path : "/registerRBS",
        element  : <RegisterRBS></RegisterRBS>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
