import React, { useContext, useState } from 'react'
import { authContext } from '../Context/Context';

export const AlertModal = () => {
    const [state,setState]=useState("");
    const {setUserState,userstate}=useContext(authContext);
    const handleClick=async()=>{
        try{
            const res=await fetch(`http://localhost:8080/reminder/${userstate._id}`,{
        method:"PUT",
        body: JSON.stringify({data:state}) ,
        headers:{
          'Content-Type': 'application/json',
        }
      })
      const data=await res.json();
      setUserState({...userstate,reminder:state})
        }catch(e){
            console.log(e.message);
        }
    }
  return (
    <div>
        <input type="time" onChange={(e)=>setState(e.target.value)}  />
        <button onClick={handleClick} >Submit</button>
    </div>
  )
}
