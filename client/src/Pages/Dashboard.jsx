
import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'universal-cookie';
import { Reminder } from '../Component/Reminder';
import { authContext } from '../Context/Context';
export const Dashboard = () => {
  const cookies= new Cookies;
  const token =cookies.get('jwt');
  const {userstate,setUserState} =useContext(authContext);
  const fetchDetails =async()=>{
       
    try{
      const res=await fetch(`http://localhost:8080/loggedInUser`,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + cookies.get('jwt'),
          }
      })
      const data= await res.json();
      setUserState(data.user);
    }catch(e){
      console.log(e);
    }
  }

   console.log(userstate);
    const handleClick=async()=>{
      let temp;
      if(userstate&&userstate.toggle){
        temp=false
      }
      if(userstate&& !userstate.toggle){
        temp=true
      }
     
      try{
        const res=await fetch(`http://localhost:8080/toggle/${userstate._id}`,{
        method:"PUT",
        body: JSON.stringify({data:temp}) ,
        headers:{
          'Content-Type': 'application/json',
        }
      })
      const data=await res.json();
      setUserState({...userstate,toggle:temp})
      }catch(e){
        console.log(e);
      }
    }
    useEffect(()=>{
      fetchDetails();
    },[])
      return (
        <div>
          <button onClick={handleClick}>
          {userstate && userstate ? userstate.toggle ? " Off":"Set Reminder" :null}
         
          </button>
          {userstate && userstate ?
        userstate.toggle?  <Reminder/> : null : null

          }
        </div>
      );
}
