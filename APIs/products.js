const exp=require('express')
const productApp=exp.Router()
const expressAsyncHandler=require("express-async-handler")
productApp.use(exp.json())
const products=[
    {
        id:1,
        name:"oreo",
        price:340

    },
    {
        id:2,
        name:"kitkat",
        price:342

    },
    {
        id:3,
        name:"5star",
        price:343

    }
]
const middleware1=(request,response,next)=>{
      console.log("middleware 1 eecuted")
      next()
}
//to execute middleware for each request
//productApp.use(middleware1)
//to execute middleware for  a specific request
productApp.get('/getproducts',async(request,response)=>{
    try{
        let productsObj=request.app.get("productsObj")
        let result=await productsObj.find().toArray()
        response.send({message:"all users",payload: result});
    }
    catch(err)
    {
        next(err)
    }
    
})
//to execute middleware for  a specific path
//productApp.use('/getusersid/:id',middleware1)
productApp.get('/getproducts/:id',async(request,response,next)=>{
    try{
        let productsObj=request.app.get("productsObj")
        //let result=await productsObj.find().toArray()
    let pid=(+request.params.id)
    let product=await productsObj.findOne({id:pid})
    if(product==null)
    {
        response.send({message:"product not found"});
    }
    else{
    response.send({message:"product found",payload: product});
    }
    }
    catch(err)
    {
        next(err)
    }
})
//creating product using promise
// productApp.post('/createproducts',(request,response)=>{
//     console.log(request.body)
//     let productsObj=request.app.get("productsObj")
//     //db.pro
//     let productobj=request.body;
//     productsObj.insertOne(productobj)
//     .then((result)=>response.send({message:"new product created"}))
//     .catch(err=>console.log("error occured",err))

    
// })
//creating product using async and await
// productApp.post('/createproducts',async(request,response)=>{
//     console.log(request.body)
//     let productsObj=request.app.get("productsObj")
//     //db.pro
//     let productobj=request.body;
//     let result=await productsObj.insertOne(productobj)
//     // .then((result)=>response.send({message:"new product created"}))
//     //.catch(err=>console.log("error occured",err))
//     response.send({message:"new product created"})

    
// })
//handling errors try catch block
// productApp.post('/createproducts',async(request,response,next)=>{
//     try{console.log(request.body)
//     let productsObj=request.app.get("productsObj")
//     //db.pro
//     let productobj=request.body;
//     let result=await productsObj.insertne(productobj)
//     // .then((result)=>response.send({message:"new product created"}))
//     //.catch(err=>console.log("error occured",err))
//     response.send({message:"new product created"})
//     }
//     catch(err){
//            next(err)
//     }

    
// })
//handling errors using express async handler
productApp.post('/createproducts',expressAsyncHandler(async(request,response,next)=>{
    console.log(request.body)
    let productsObj=request.app.get("productsObj")
    //db.pro
    let productobj=request.body;
    let result=await productsObj.insertne(productobj)
    // .then((result)=>response.send({message:"new product created"}))
    //.catch(err=>console.log("error occured",err))
    response.send({message:"new product created"})
}))  
    
productApp.put('/updateproduct',async(request,response,next)=>
{
    try{
        let productsObj=request.app.get("productsObj")
        let modifiedproduct=request.body;
        console.log(modifiedproduct)
        await productsObj.updateOne({id:modifiedproduct.id},{$set:{...modifiedproduct}})
        response.send({mesaage:"product updated"})
    }
    catch(err)
    {
        next(err)
    }
})
    

module.exports=productApp;