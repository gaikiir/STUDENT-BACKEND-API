
const mongoose = require('mongoose');

const Schema = mongoose.Schema;// initialize mongoose schema object for creating schema lists   
const LectSchema = new Schema({
    FirstName:{
        type:String,
        required:[true,'firt_name is required please']
    },
    LastName:{
        type:String,
        required:[true,'last_name is required please']
    },
    Gender:{
        type:String,
        required:[true,'gender is required please']
    },
    Email:{
        type:String,
        required:[true,'email is required please']
    },
});

//this is the modele object
const LecturerModel = mongoose.model('Lecturer',LectSchema);

//export the model object
module.exports = LecturerModel;
