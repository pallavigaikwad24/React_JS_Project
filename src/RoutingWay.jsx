import React from 'react'
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import HomeLogin from './HomeLogin.jsx';
import Login from './LoginPage/Login.jsx';
import Signup from './SignUp/Signup.jsx';
import ForgetPassword from './ForgetPasswprd/ForgetPassword.jsx';
import PasswordField from './ForgetPasswprd/PasswordField.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Home from './Home/Home.jsx';
import Explore from './Home/First-section/Explore/Explore.jsx';
import Profile from './Home/First-section/Profile/Profile.jsx';
import NotFound from './NotFound.jsx';
function RoutingWay() {

    const router = createBrowserRouter([
        {
            path:'/',
            element:<HomeLogin/>
        },
        {
            path:'/login',
            element:<Login/>
        },
        {
            path:'/signup',
            element:<Signup/>
        },
        {
            path:'/login/:username?/home',
            element:<PrivateRoute Component={Home}/>
        },
        {
            path:'/forgetpassword',
            element:<ForgetPassword/>
        },
        {
            path:'/forgetpassword/:username?',
            element:<PasswordField/>
        },
        {
            path:'/login/:username?/explore',
            element:<PrivateRoute Component={Explore}/>
        },
        {
            path:'/login/:username?/profile',
            element:<PrivateRoute Component={Profile}/>
        },{
            path:'*',
            element:<NotFound/>
        }
        
    ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default RoutingWay;