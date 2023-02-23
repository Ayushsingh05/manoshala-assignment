
import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'universal-cookie';
import { Reminder } from '../Component/Reminder';
import { authContext } from '../Context/Context';
import '../Component/componentstyle.css'
import { Navbar } from '../Component/Navbar';
import { Button } from '@chakra-ui/react';
export const Dashboard = () => {
  const cookies= new Cookies;
  const token =cookies.get('jwt');
  const {userstate,setUserState,setTaskArray} =useContext(authContext);
  const fetchDetails =async()=>{
       
    try{
      const res=await fetch(`https://timer-backend.vercel.app/loggedInUser`,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + cookies.get('jwt'),
          }
      })
      const data= await res.json();
      setTaskArray(data.user.tasks);
      setUserState(data.user);
    }catch(e){
      console.log(e);
    }
  }
    const handleClick=async()=>{
      let temp;
      if(userstate&&userstate.toggle){
        temp=false
      }
      if(userstate&& !userstate.toggle){
        temp=true
      }
     
      try{
        const res=await fetch(`https://timer-backend.vercel.app/toggle/${userstate._id}`,{
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
          <Navbar/>
          <Button ml={'45%'} mt="10%" mb="2%" colorScheme={userstate && userstate ? userstate.toggle ?"red":"whatsapp" :null} onClick={handleClick}>
          {userstate && userstate ? userstate.toggle ? " Off":"Set Reminder" :null}
         
          </Button>
          {userstate && userstate ?
        userstate.toggle?  <Reminder/> : null : null

          }
        </div>
      );
}
