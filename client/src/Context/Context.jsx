import React, { createContext, useState } from 'react'
import App from '../App';


export const authContext=createContext();

export const Context = () => {
    const [userstate,setUserState]=useState({});
   const [loggedIn,setLoggenIn]=useState(false);
  return (
    <authContext.Provider value={{userstate,setUserState,loggedIn,setLoggenIn}} >
<App/>
    </authContext.Provider>
  )
}
