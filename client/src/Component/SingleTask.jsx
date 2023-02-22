import React, { useContext } from 'react'
import { authContext } from '../Context/Context'

export const SingleTask = ({props}) => {
    const {setTaskArray,taskArr,userstate} =useContext(authContext);
    const updateTaskArray=()=>{
     const newArray=  taskArr.filter(el => el._id !== props._id);
     setTaskArray(newArray);
    }
    const handleDelete=async()=>{
        try{
            const res=await fetch(`http://localhost:8080/delete/${userstate._id}`,{
            method:"PUT",
            body: JSON.stringify({deleteID:props._id}) ,
            headers:{
              'Content-Type': 'application/json',
            }
          })
          const data=await res.json();
          console.log(data);
          updateTaskArray();
          
          }catch(e){
            console.log(e);
          }
    }
  return (
    <div>
        <p>Time:{props.time} Status:{props.status}</p>
        <button onClick={handleDelete} >Delete</button>
    </div>
  )
}
