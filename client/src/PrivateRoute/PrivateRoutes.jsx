import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { authContext } from '../Context/Context'
import { Dashboard } from '../Pages/Dashboard';

export const  PrivateRoutes = () => {
 const {loggedIn}=useContext(authContext);
 const navigate=useNavigate();
 useEffect(()=>{
     if(!loggedIn){
        navigate('/login');
     
     }
    
 },[])
 return(
    <Dashboard/>
 )
}
