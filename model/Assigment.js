const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema object assignment 
const assignmentSchema = new Schema({
    createEvents:{
        type:String,
        required:['createEvents is required please']
    }
})

//create assignment object model
const assignmentModel = mongoose.model('Assignment',assignmentSchema);