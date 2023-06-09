const exp=require('express');

require('dotenv').config()
const app=exp();
//import path module
const path=require('path')
const mclient=require('mongodb').MongoClient;
app.use(exp.json());
//joining node js and react js application 
app.use(exp.static(path.join(__dirname,'./build')))

//importi ng users and products api
const userApp=require('./APIs/users')
const productApp=require('./APIs/products')

//creating different routes
app.use('/user-api',userApp)
app.use('/product-api',productApp)
//dealing withpage refreshes
app.use('*',(request,response)=>{
    response.sendFile(path.join(__dirname,'/build/index.html'))
})
const dbURI="mongodb+srv://manasamanasa611:mspq137@cluster0.grhxlyb.mongodb.net/?retryWrites=true&w=majority"
//connection mongodb
mclient.connect(process.env.DATABASE_URI)
.then((client)=>{
    let dbObj=client.db("jpdb")
    // let usersObj=dbObj.createCollection("users")
    // let productsObj=dbObj.createCollection("products")
    //creatin object for users and products collection
    let usersObj=dbObj.collection("users")
    let productsObj=dbObj.collection("products")
    //setting products and users collection object
    
    app.set("usersObj",usersObj)
    app.set("productsObj",productsObj)
    console.log("DB connected successfully")
})
.catch(err=>console.log("error in db connection"))

//handling invalid path
app.use((request,response,next)=>{
    response.send({message:`path ${request.url} is invalid`})
})
//handling errors
app.use((error,request,response,next)=>{
    response.send({reason:`${error.message}`})
})
app.listen(process.env.PORT,()=>{console.log("server is listening at 5000")})