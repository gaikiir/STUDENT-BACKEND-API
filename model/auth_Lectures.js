const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const authLectSchema = new Schema({
    email:{
        type:String,
        required:['email is required please']
    },
    password:{
        type:String,
        required:['password is required please']
    }
});

//create a object model for autlectmodel
const AuthLectModel = mongoose.model('authlect', authLectSchema);

//export the model
module.exports = AuthLectModel;