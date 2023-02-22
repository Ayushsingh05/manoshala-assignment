import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../Pages/Dashboard'
import { Login } from '../Pages/Login'
import { Register } from '../Pages/Register'
import { PrivateRoutes } from '../PrivateRoute/PrivateRoutes'

export const AllRoutes = () => {
  return (
   <Routes>
    <Route path='/' element={<PrivateRoutes><Dashboard/></PrivateRoutes>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>}/>
   </Routes>
  )
}
