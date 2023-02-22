const express= require('express');
const { login, register, loggedInUser, handleToggle } = require('../controller/userController');
const userauthenticate = require('../middleware/auth.middleware');
const routes= express.Router();

routes.post('/login',login);
routes.post('/register',register);
routes.get('/loggedIn',userauthenticate,loggedInUser);
routes.patch('/toggle',userauthenticate,handleToggle);


module.exports=routes;