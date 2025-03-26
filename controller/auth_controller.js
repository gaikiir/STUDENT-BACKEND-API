const UsersAccountInfo = require('../model/auth_model');
const {auth_modelSchema} = require('../helpers/validation');
const createError = require('http-errors');

module.exports ={
    Register: async(request,response,next)=>{
        try{
            const {email} = request.body;
            const result = await auth_modelSchema.validateAsync(request.body);
            const existUser = await UsersAccountInfo.findOne({email:email});
            if(existUser){
                throw createError.Conflict(`${email} has already been registered`)
            }
            const newUser = new UsersAccountInfo(result);
            const saveUser = newUser.save();
            response.send(saveUser);
        }
        catch(error){
            if(error.isJoi === true){
                error.status = 422
            }
            next(error)
        }
    },

    login: async (request, respond, next) => {
        try {
            const  userinfor= await auth_modelSchema.validateAsync(request.body);
            const user = await UsersAccountInfo.findOne({ email: userinfor.email})
            if (!user){
                throw createError.NotFound('User not registered');
            }
            //checke for matching  password
            const isMatchedpwd = await user.isValidPassword(userinfor.password);
            if (!isMatchedpwd) {
                throw createError.Unauthorized('Username/Password not valid');
            }
            respond.send(user)
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Invalid username/password'));
            next(error)
        }
    }

}

