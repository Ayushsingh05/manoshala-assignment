import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { authContext } from '../Context/Context'

export const PrivateRoutes = ({child}) => {
 const {loggedIn}=useContext(authContext);
 const navigate=useNavigate();
 if(loggedIn){
    return child;
 }
 navigate('/login');
}
