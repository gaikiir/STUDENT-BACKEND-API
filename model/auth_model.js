const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserinfoSchema = new Schema({
    email:{
        type:String,
        required:['email is required please']
    },
    password:{
        type:String,
        required:['password is required please']
    }
})

//hash the password before saving it
UserinfoSchema.pre('save',async function(next){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(this.password,salt);
        this.password =  hashedpassword;
        next()
    }
    catch(err){
        next(err);
    }
})

//compare the entered password with the password stored in the database
UserinfoSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } 
    catch (error) {
        throw error;
    }
}

//creating users account info models 
const UserInfoModel = mongoose.model('users', UserinfoSchema);

//export the model object
module.exports = UserInfoModel;

