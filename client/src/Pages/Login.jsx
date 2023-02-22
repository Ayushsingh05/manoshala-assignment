import React, { useState , useContext,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { authContext } from './../Context/Context';
import Cookies from 'universal-cookie'
export const Login = () => {
    const cookies = new Cookies();
    const {setLoggenIn,setUserState}=useContext(authContext)
    const obj={
        email:"",
        password:"",
    }
    
    const [state,setState]=useState(obj);
    const navigate= useNavigate()
    const fetchDetails =async()=>{
       
        try{
          const res=await fetch(`http://localhost:8080/loggedInUser`,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + cookies.get('jwt'),
              }
          })
          const data= await res.json();
          console.log(data);
          setUserState(data.user);
        }catch(e){
          console.log(e);
        }
      }
    const handleChange=(e)=>{
        setState({...state,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
       e.preventDefault();
       console.log(state);
        try{
            const res=await fetch(`http://localhost:8080/login`,{
                method:"POST",
                body:JSON.stringify(state),
          headers: {
              'Content-Type': 'application/json',
            }
         });
         const data = await res.json();
        if(data.status=="success"){
            setLoggenIn(true);
            cookies.set('jwt' , data.token , {
                maxAge:24 * 60 * 60 * 60,
                path: '/'
               });
               setTimeout(() => {
                   fetchDetails();
               }, 500);
            navigate("/");
        }
        }catch(e){
console.log(e);
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="email" name='email' value={state.email} placeholder='Enter Email' required onChange={handleChange} />
            <input type="password" name='password' value={state.password} placeholder='Enter Password' required onChange={handleChange} />
            <input type="submit" value="Submit" />
        </form>
    </div>
  )
}
