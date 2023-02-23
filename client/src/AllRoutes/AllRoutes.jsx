import React, { useContext,useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { authContext } from '../Context/Context'
import { Dashboard } from '../Pages/Dashboard'
import { Login } from '../Pages/Login'
import { Register } from '../Pages/Register'
import { Tasks } from './../Pages/Tasks';

export const AllRoutes = () => {
  const cookies =new Cookies();
  const {loggedIn,setLoggedIn}=useContext(authContext);
 
  const token =cookies.get('jwt')
  
  useEffect(()=>{
    if(token){
      
      setLoggedIn(true)
    }
  },[])
  return (
   <Routes>
    <Route path='/' element={loggedIn?<Dashboard/>:<Login/> } />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>}/>
    <Route path='/tasks' element={<Tasks/>} />
    
   </Routes>
  )
}
