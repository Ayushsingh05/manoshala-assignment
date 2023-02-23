import React from 'react';
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/" className="navbar-item">
          My App
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
       
        <Link to={'/'}><Button colorScheme='blue' mr="15px">Home</Button></Link>
        <Link to={'/tasks'}> <Button colorScheme='orange' mr="15px">Tasks</Button></Link>
      
        </div>
      </div>
    </nav>
  );
};
