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
export const AlertModal = ({props}) => {
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
      props();
        }catch(e){
            console.log(e.message);
        }
    }
  return (
    <div>
          <>
          <ModalHeader>Change Reminder</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
              <FormLabel>Time</FormLabel>
              <Input type={'time'} placeholder='Enter Time' onChange={(e)=>setState(e.target.value)} required />
              <ModalFooter>
            <Button onClick={handleClick} colorScheme='blue' mr={3}>
              Submit
            </Button>
            <Button onClick={props}>Cancel</Button>
          </ModalFooter>
          </ModalBody>
          </>
    </div>
  )
}
