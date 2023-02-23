import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../Context/Context';
import { AlertModal } from './AlertModal';
import { SetInput } from './Input';
import {RxLapTimer} from 'react-icons/rx'
import {BiTask} from 'react-icons/bi'
import {
  Modal,
  useDisclosure,
  Button,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Box,
  Text,
} from '@chakra-ui/react'
export const Reminder = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { userstate, taskArr } = useContext(authContext);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isTasksModalOpen, setIsTasksModalOpen] = useState(false);

  const openReminderModal = () => {
    setIsReminderModalOpen(true);
  }

  const closeReminderModal = () => {
    setIsReminderModalOpen(false);
  }

  const openTasksModal = () => {
    setIsTasksModalOpen(true);
  }

  const closeTasksModal = () => {
    setIsTasksModalOpen(false);
  }
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

    taskArr.map(el => reminderFunc(Number(el.time.split(':')[0]), Number(el.time.split(':')[1]), el.status))

  }

  useEffect(() => {
    callmyfunction();
  }, [taskArr]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      if (hours === Number(userstate.reminder.split(':')[0]) && minutes ===Number(userstate.reminder.split(':')[1])) {
        callmyfunction();
        alert("Reminder Alert")
        clearInterval(interval);
      }
    }, 60000);
    
    return () => {
      clearInterval(interval);
    };
  }, [userstate]);
  
  return (
    <Box ml={"36%"}  className="container">
      <Text color={"green"} fontWeight="bold" mb={"2%"} width="max-content" borderBottom="1px solid #ccc" >Alert will show at  {Number(userstate.reminder.split(':')[0])}:{Number(userstate.reminder.split(':')[1])}  EveryDay </Text>
      <Button onClick={openReminderModal} ml={"-3%"}  leftIcon={<RxLapTimer/>} >Set Reminder</Button>
      <Button onClick={openTasksModal} ml="2%" leftIcon={<BiTask/>} >Set Tasks</Button>

      <Modal isOpen={isReminderModalOpen} onClose={closeReminderModal}>
        <ModalOverlay />
        <ModalContent>
          <AlertModal props={closeReminderModal} />
        </ModalContent>
      </Modal>

      <Modal isOpen={isTasksModalOpen} onClose={closeTasksModal}>
        <ModalOverlay />
        <ModalContent>
          <SetInput props={closeTasksModal} />
        </ModalContent>
      </Modal>
    </Box>
  )
}
