const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema object assignment 
const assignmentSchema = new Schema({
    createEvents:{
        type:String,
        required:[true,'createEvents is required please']
    },
    title: {
        type: String,
        required: [true,'Title is required please']
    },
    author: {
        type: String,
        required:[true,'Please Author is required']
    }
})

//create assignment object model
const assignmentModel = mongoose.model('Assignment',assignmentSchema);
module.exports = assignmentModel;