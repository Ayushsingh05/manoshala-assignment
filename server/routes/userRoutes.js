const express= require('express');
const { userLogin, userRegister, loggedInUser, handleToggle } = require('../controller/userController');
const userauthenticate = require('../middleware/auth.middleware');
const routes= express.Router();

routes.post('/register', async(req, res)=>{
    const data =req.body;
 console.log('/',data);
        const message= await userRegister(data);
         
        res.send(message);
    

})
routes.post('/login',async(req,res)=>{
    const data =req.body;
    const message = await userLogin(data);
    if(message.status=="success"){
        res.status(200).send(message)
    }
    else{
        res.status(404).send(message);
    }
     
})
routes.get('/loggedInUser',userauthenticate, async(req,res)=>{
    const data= req.user;
    const message =await loggedInUser(data);
    res.send(message);
})
routes.put('/toggle/:id',async(req,res)=>{
    const {data}=req.body;
    const {id}=req.params;
 
    const result= await handleToggle(data,id);
    res.send(result)
});


module.exports=routes;