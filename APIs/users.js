const exp=require('express')
const bcryptjs=require("bcryptjs")
const userApp=exp.Router()
const jwttoken=require("jsonwebtoken")
const authUser=require("../middleware/authUser")
userApp.use(exp.json())

userApp.get('/userprofile',authUser,async(request,response)=>{
    let User=request.app.get("usersObj")
    const userid = request.user;
    
    if(!userid) {
        response
        .send({
            message : "Not found, userid is required"
        });
        return;
    }
    else
    { 
        let user= await User.findOne({username:userid})
        response
        .send(
           {fullname:user.fullname,mobileno:user.mobileno,email:user.email,gender:user.gender,message:"user found"} 
        );
    
    }
})
userApp.post('/getusers',async(request,response,next)=>{
    try{
        let usersObj=request.app.get("usersObj")
        let usercred=request.body;
        let finduser= await usersObj.findOne({username:usercred.username})
        if(finduser==null)
        {
            response.send({message:"user doesn't exists"});
        }
        else{
             let status=await bcryptjs.compare(usercred.password,finduser.password)
             if(status==false)
             {
                response.send({message:"Invalid password"});
             }
             else{
                 let token=jwttoken.sign({userid:usercred.username},'abcdef')
                 response.send({message:"login successful",payload:token,userobj:finduser});
             }
        }
    }
    catch(err){
        next(err)
    }
    //response.send({message:"user found",payload: userobj});
})
userApp.post('/createusers',async(request,response,next)=>{
    try{
        //user collection object
        let usersObj=request.app.get("usersObj")
        let newuser=request.body;
        let finduser= await usersObj.findOne({username:newuser.username})
        //if user exists
        if(finduser!=null)
        {
            response.send({message:"user already exists"});
        }
        else{
            //hashing password
            let hashpassword=await bcryptjs.hash(newuser.password,10)
            newuser.password=hashpassword;
            //inserting user
            await usersObj.insertOne(newuser)
            response.send({message:"user created successfully"});
        }
    }
    catch(err)
    {
        next(err)
    }
})
module.exports=userApp;