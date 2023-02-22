
const userModel= require('../Models/userModel');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');

const register=async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password ){
     res.status(404).send("field is required");
    }
    else{
        const existingUser= await userModel.findOne({email:email});
        if(existingUser){
            res.status(404).send("user already exists");
        }
        else{
            const hashpassword = bcrypt.hash(password,10);
            const user= new userModel({
                name:name,
                password:hashpassword,
                email:email,
            })
            const createdUser= await userModel.create(user);

            res.status(200).send({"message":"user registered successfully", data:createdUser});
        }
    }
}

const login=async(req,res)=>{
    const {email,password} = req.body;
    try{
        const userExist=await userModel.findOne({email:email});
        if(userExist){
            const temp=await bcrypt.compare(password,userExist.password);
            if(temp){
                const token=  jwt.sign({id:userExist.id},"secret");
                res.status(200).send({
                    "message":"user logged in successfully",
                    "token":token,
                    "data":userExist
            })
            }
            else{
                res.status(404).send("email or password in incorrect");
            }
        }else{
            res.status(404).send("user not registered")
        }
    }catch(e){

    }
}

const loggedInUser=async(req,res)=>{
    try{
        res.status(200).send(req.user)
    }catch(e){
        res.status(404).send("user not exist");
    }

}

const handleToggle=async(req,res)=>{
    const {_id}=req.user;
    try{
        const temp= userModel.findByIdAndUpdate(_id,{
            toggle:req.body
        }).select("-password");
        res.status(200).send({"message":"toggle updated successfully","data":temp})
    }catch(e){
        res.status(404).send({"message":e.message})
    }
}

const updateTime=async(req,res)=>{
    
}
module.exports={
    login,
    register,
    loggedInUser,
    handleToggle,
    updateTime
}

 