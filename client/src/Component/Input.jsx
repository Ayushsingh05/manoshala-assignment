import React, { useContext, useState } from 'react'
import { authContext } from '../Context/Context';
import {
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
 Input,
  Button,
  FormLabel,
} from '@chakra-ui/react'
export const SetInput = ({props}) => {
  
  const {userstate,setTaskArray,taskArr} =useContext(authContext);
  const [task,setTask]=useState({time:"",status:""});
  const handleChange=(e)=>{
    setTask({...task,[e.target.name]:e.target.value});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await fetch(`https://timer-backend.vercel.app/update/${userstate._id}`,{
      method:"PUT",
      body: JSON.stringify({data:task}) ,
      headers:{
        'Content-Type': 'application/json',
      }
    })
    const data=await res.json();
   console.log(data);
    setTaskArray([...taskArr,task]);
    props()
    }catch(e){
      console.log(e);
    }
  }
  return (
    <>
    <ModalHeader>Set Task</ModalHeader>
    <ModalCloseButton />
    <ModalBody pb={6}>
        <FormLabel>Time</FormLabel>
        <Input type={'time'} placeholder='Enter Time' name="time" onChange={handleChange} isRequired/>
        <FormLabel>Status</FormLabel>
        <Input type={'text'} placeholder='Enter Status'name='status' onChange={handleChange} isRequired/>
        <ModalFooter>
      <Button onClick={handleSubmit} colorScheme='blue' mr={3}>
        Submit
      </Button>
      <Button onClick={props}>Cancel</Button>
    </ModalFooter>
    </ModalBody>
    </>
  )
}
