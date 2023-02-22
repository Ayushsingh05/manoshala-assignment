import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const obj={
    email:"",
    password:"",
    name:""
}
const [state,setState]=useState(obj);
const handleChange=(e)=>{
    setState({...state,[e.target.name]:e.target.value})
}
const navigate=useNavigate();
const handleSubmit=async(e)=>{
   e.preventDefault();
    try{
        const res=await fetch(`http://localhost:8080/register`,{
            method:"POST",
            body:JSON.stringify(state),
      headers: {
          'Content-Type': 'application/json',
        }
     });
     const data = await res.json();
     navigate('/login')
    }catch(e){
console.log(e);
    }
}
return (
<div>
    <form onSubmit={handleSubmit}>
    <input type="text" name='name' value={state.name} placeholder='Enter Name' required onChange={handleChange} />
        <input type="email" name='email' value={state.email} placeholder='Enter Email' required onChange={handleChange} />
        <input type="password" name='password' value={state.password} placeholder='Enter Password' required onChange={handleChange} />
        <input type="submit" value="Submit" />
    </form>
</div>
)
}
