import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../Context/Context';
import { Input } from './Input';
import { SingleTask } from './SingleTask';

export const Reminder = () => {
  const [showAlert, setShowAlert] = useState(false);
  const { userstate,taskArr } = useContext(authContext)
  const reminderFunc = (hour, min, status) => {
    const now = new Date();
    const alertTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, min, 0);
    const timeUntilAlert = alertTime.getTime() - now.getTime();
    if (timeUntilAlert > 0) {
      setTimeout(() => {
        alert(`Time to ${status}`);
      }, timeUntilAlert);
    }
  }
  const callmyfunction = () => {

    userstate.tasks.map(el => reminderFunc(Number(el.time.split(':')[0]), Number(el.time.split(':')[1]), el.status))

  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      if (hours === 20 && minutes === 27) {
        callmyfunction();
        clearInterval(interval);
      }
    }, 60000);
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
      <h1>
        Change reminder time
      </h1>
      <p>Alert will show at  {userstate.reminder} AM EveryDay </p>
      <ul>
        {
          taskArr.map((el,i) => <SingleTask key={i}  props={el} />)
        }
      </ul>
      <Input />

    </div>
  )
}
