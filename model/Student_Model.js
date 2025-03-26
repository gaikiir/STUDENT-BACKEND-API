const  mongoose = require('mongoose');

const Schema = mongoose.Schema;// initialize mongoose schema object for creating schema lists

//this is the schema object 
const userSchema = new Schema({
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
    }
})

//this is the modele object 
const studentModel = mongoose.model('Studentpro', userSchema);

//export the model object
module.exports = studentModel;




