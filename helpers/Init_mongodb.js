// creating our environment variables 
// after creating environment variables go to an env file which you have created  configure it there 

//here we need to connect to our mongo database 

const mongoose = require('mongoose');


// now to coonect to mongodb we need to install an env 
//creating our coonector 
mongoose.connect(process.env.MONGODB_URI,{dbName:process.env.DB_NAME})
.then(()=>{
    console.log(`MongoDb Connected successfully`)
}).catch((error)=>{
    console.log(error.message);
})