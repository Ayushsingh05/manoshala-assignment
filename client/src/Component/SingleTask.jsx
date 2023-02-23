import { Box, Button, Text } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { authContext } from '../Context/Context'
import {MdDeleteForever,MdDelete} from 'react-icons/md'
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
    <Box display="flex" gap={"20px"} alignItems="center" mt="20px" padding={"15px"} textAlign={"center"} m={"auto"} borderBottom="1px solid #ccc"   width={"max-content"}>
        <Text fontSize={"20px"}>Time: <span style={{color:"blue",fontWeight:"bold"}}>{props.time}</span> Status: <span style={{color:"blue", fontWeight:"bold"}}>{props.status}</span></Text>
        <Button  colorScheme={"red"} onClick={handleDelete} ><MdDelete/></Button>
    </Box>
  )
}
