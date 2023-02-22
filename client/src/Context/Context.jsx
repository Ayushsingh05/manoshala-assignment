import React, { createContext, useState } from 'react'
import App from '../App';


export const authContext=createContext();

export const Context = () => {
    const [userstate,setUserState]=useState({});
   const [loggedIn,setLoggedIn]=useState(false);
   const [taskArr,setTaskArray,]=useState([]);
  return (
    <authContext.Provider value={{userstate,setUserState,loggedIn,setLoggedIn,taskArr,setTaskArray}} >
<App/>
    </authContext.Provider>
  )
}
