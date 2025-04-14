const mongoose = require('mongoose');

const Schema = mongoose.Schema; // initialize mongoose schema object for creating schema lists   
const LectSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
});

// this is the model object
const LecturerModel = mongoose.model('Lecturer', LectSchema);

// export the model object
module.exports = LecturerModel;
