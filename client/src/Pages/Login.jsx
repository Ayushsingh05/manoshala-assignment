import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from './../Context/Context';
import Cookies from 'universal-cookie';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
export const Login = () => {
  const cookies = new Cookies();
  const { setLoggedIn, setUserState, setTaskArray } = useContext(authContext)
  const obj = {
    email: "",
    password: "",
  }

  const [state, setState] = useState(obj);
  const navigate = useNavigate()
  const fetchDetails = async () => {

    try {
      const res = await fetch(`http://localhost:8080/loggedInUser`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + cookies.get('jwt'),
        }
      })
      const data = await res.json();
      console.log(data);
      setTaskArray(data.user.tasks);
      setUserState(data.user);
    } catch (e) {
      console.log(e);
    }
  }
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state);
    try {
      const res = await fetch(`http://localhost:8080/login`, {
        method: "POST",
        body: JSON.stringify(state),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await res.json();
      if (data.status == "success") {
        setLoggedIn(true);
        cookies.set('jwt', data.token, {
          maxAge: 24 * 60 * 60 * 60,
          path: '/'
        });
        setTimeout(() => {
          fetchDetails();
        }, 500);
        navigate("/");
      }
      else{
        alert(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" name='email' value={state.email} placeholder='Enter Email' onChange={handleChange} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name='password' value={state.password} placeholder='Enter Password' required onChange={handleChange} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link to={'/register'} color={'blue.400'}>Sign up</Link>
              </Stack>
              <Button
                onClick={handleSubmit}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}




