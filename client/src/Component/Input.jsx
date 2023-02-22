import React, { useContext, useState } from 'react'
import { authContext } from '../Context/Context';

export const Input = () => {
  
  const {userstate,setTaskArray,taskArr} =useContext(authContext);
  const [task,setTask]=useState({time:"",status:""});
  const handleChange=(e)=>{
    setTask({...task,[e.target.name]:e.target.value});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await fetch(`http://localhost:8080/update/${userstate._id}`,{
      method:"PUT",
      body: JSON.stringify({data:task}) ,
      headers:{
        'Content-Type': 'application/json',
      }
    })
    const data=await res.json();
   
    setTaskArray([...taskArr,task]);
    
    }catch(e){
      console.log(e);
    }
  }
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
      <input type="time"  name="time"  onChange={handleChange}/>
        <input type="text" name='status' onChange={handleChange} />
        <input type="submit" value="Submit" />
        </form>
    </div>
  )
}
