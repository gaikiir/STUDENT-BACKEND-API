
const mongoose = require('mongoose');

const Schema = mongoose.Schema;// initialize mongoose schema object for creating schema lists   
const LectSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:['firt_name is required please']
    },
    LastName:{
        type:String,
        required:['last_name is required please']
    },
    Gender:{
        type:String,
        required:['gender is required please']
    },
    Email:{
        type:String,
        required:['email is required please']
    },
});

//this is the modele object
const LecturerModel = mongoose.model('Lecturer',LectSchema);

//export the model object
module.exports = LecturerModel;
