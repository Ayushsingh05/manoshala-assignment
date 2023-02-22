import React, { useState } from 'react'

export const Login = () => {
    const obj={
        email:"",
        password:"",
    }
    const [state,setState]=useState(obj);
    const handleChange=(e)=>{
        setState({...state,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
       e.preventDefault();
        
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="email" name='email' placeholder='Enter Email' required onChange={handleChange} />
            <input type="password" name='password' placeholder='Enter Password' required onChange={handleChange} />
            <input type="submit" value="Submit" />
        </form>
    </div>
  )
}
