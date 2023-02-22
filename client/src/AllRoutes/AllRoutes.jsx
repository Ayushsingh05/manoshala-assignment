import React, { useContext,useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { authContext } from '../Context/Context'
import { Dashboard } from '../Pages/Dashboard'
import { Login } from '../Pages/Login'
import { Register } from '../Pages/Register'
import {PrivateRoutes}  from '../PrivateRoute/PrivateRoutes'

export const AllRoutes = () => {
  const cookies =new Cookies();
  const {loggedIn,setLoggenIn,setUserState}=useContext(authContext);
 
  const token =cookies.get('jwt')
  
  useEffect(()=>{
    if(token){
      
      setLoggenIn(true)
    }
  },[])
  return (
   <Routes>
    <Route path='/' element={loggedIn?<Dashboard/>:<Login/> } />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>}/>
   </Routes>
  )
}
