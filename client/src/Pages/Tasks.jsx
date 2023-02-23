import { Heading } from '@chakra-ui/react';
import React from 'react'
import { useContext } from 'react'
import { Navbar } from '../Component/Navbar';
import { authContext } from '../Context/Context'
import { SingleTask } from './../Component/SingleTask';

export const Tasks = () => {
    const {  taskArr } = useContext(authContext)
  return (
    <>
    <Navbar/>
    <div>
      <Heading textAlign={"center"}>Tasks</Heading>
    {
      taskArr.map((el, i) => <SingleTask  key={i} props={el} />)
    }
  </div>
  </>
  )
}
