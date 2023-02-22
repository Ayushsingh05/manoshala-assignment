
import React, { useState, useEffect } from 'react';
export const Dashboard = () => {
    const [showAlert, setShowAlert] = useState(false);
    const callmyfunction=()=>{
      const now = new Date();
      const alertTime1 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 1, 51, 0); // set alert time to 2pm
      const alertTime2 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 1, 52, 0);
      const alertTime3 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 1, 53, 0);
      const timeUntilAlert1 = alertTime1.getTime() - now.getTime();
      const timeUntilAlert2 = alertTime2.getTime() - now.getTime();
      const timeUntilAlert3 = alertTime3.getTime() - now.getTime();
    
      if (timeUntilAlert1 > 0) {
        setTimeout(() => {
          alert("1");
        }, timeUntilAlert1);
      }
      if (timeUntilAlert2 > 0) {
        setTimeout(() => {
          alert("2");
        }, timeUntilAlert2);
      }
      if (timeUntilAlert3 > 0) {
        setTimeout(() => {
          alert("3");
        }, timeUntilAlert3);
      }
    }
      useEffect(() => {
        const interval = setInterval(() => {
          const now = new Date();
          const hours = now.getHours();
          const minutes = now.getMinutes();
    
          if (hours === 10 && minutes === 0) {
            setShowAlert(true);
            callmyfunction();
            clearInterval(interval);
          }
        }, 60000); // Check every minute
    
        return () => {
          clearInterval(interval);
        };
      }, []);
    
      return (
        <div className="container">
        <h1>My App</h1>
        <div className="alert-wrapper">
          {showAlert && <div className="alert">Time to show the alert!</div>}
        </div>
        <p>Rest of the page content goes here</p>
      </div>
      );
}
