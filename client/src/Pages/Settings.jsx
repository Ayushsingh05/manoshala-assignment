import React from 'react'
import { Input } from './../Component/Input';
import { AlertModal } from './../Component/AlertModal';
import { Navbar } from '../Component/Navbar';

export const Settings = () => {
  return (
    <>
    <Navbar/>
    <AlertModal />
    <Input />
    </>
  )
}
