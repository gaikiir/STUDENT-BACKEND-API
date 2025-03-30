
const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports={
     //assignAccessToken get token when a user enter their credetial , we use the user id 
     signAccessToken: async(userId)=>{
        // return token object using promise
        return new Promise((resolve,reject)=>{
           //
           const payload ={};
           //creating access token 
           const secret = process.env.ACCESS_TOKEN_SECRET;
           //options where we put the expired time , issues , audience
           const options = {
               expiresIn:"20m",
               issuer:"EddTechnologies.com",
               audience: userId
           }

           JWT.sign(payload,secret,options,(error,token)=>{
               if(error){
                   //any error when accessing token captch it and display error message 
                   console.log(error.message);
                   //reject request and dispaly internalservererror message 
                   reject(createError.InternalServerError());
               }

               // when request is successfully fetched give token
               resolve(token)
           })
           
        })
   },
   //refreshing the previous token of the user 
   signRefreshToken:async (userId)=>{
       return new Promise((resolve,reject)=>{
           const payload={};
           const secret = process.env.REFRESH_TOKEN_SECRET;
           const options ={
               expiresIn: "20m",
               issuer: "EddTechnologies.com",
               audience: userId
           }
           JWT.sign(payload,secret,options,(error,token)=>{
               if(error){
                   console.log(error.message)
                   reject(createError.InternalServerError())
               }
               resolve(token)
           })
       })
   },
   
   //now we want to verify if the user has a token to when login to the server 
   verifyuserAccessToken:async(request,response,next)=>{
       if(!request.headers['authorization']) return next(createError.Unauthorized())
       
       const authHeaders = request.headers['authorization'];
       const bearerToken = authHeaders.split(' ');
       const token = bearerToken[1];
       JWT.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,payload)=>{
           if(err){
               if(err.name === 'JsonWebTokenError'){
                   return next(createError.Unauthorized())
               }else{
                   return next(createError.Unauthorized(err.message))
               }
           }
           request.payload = payload,
           next()
       })
   }
   
}
