const mongoose = require("mongoose");
const userModels = require("../model/Student_Model");
const createError = require("http-errors");

module.exports = {
    Allstudents: async (request, response, next) => {
        try {
            const students = await userModels.find();
            response.send(students);
        } catch (error) {
            next(error); // Forward error to Express
        }
    },

    addstudent: async (request, response, next) => {
        try {
            const newStudent = new userModels(request.body);
            const result = await newStudent.save();
            response.send(result);
        } catch (error) {
            if (error.name === "ValidationError") {
                next(createError(422, error.message));
            } else {
                next(error);
            }
        }
    },

    getStudentById: async (request, response, next) => {
        const id = request.params.id;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createError(400, "Invalid student ID"));
        }

        try {
            const student = await userModels.findById(id);
            if (!student) {
                return next(createError(404, "Student not found"));
            }
            response.send(student);
        } catch (error) {
            next(error);
        }
    },

    updateStudent: async (request, response, next) => {
        const id = request.params.id;
console.log('received Id', id)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createError(400, "Invalid student ID"));
        }

        try {
            const update = request.body;
            const options = { new: true };
            const Newupdate = await userModels.findByIdAndUpdate(id, update, options);
            
            if (!Newupdate) {
                return next(createError(404, "Student not found"));
            }
            response.send(Newupdate);
        } catch (error) {
            next(error);
        }
    },

    patchStudent: async (request, response, next) => {
        const id = request.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createError(400, "Invalid student ID"));
        }

        try {
            const update = request.body;
            const options = { new: true };
            const Newupdate = await userModels.findByIdAndUpdate(id, update, options);
            
            if (!Newupdate) {
                return next(createError(404, "Student not found"));
            }
            response.send(Newupdate);
        } catch (error) {
            next(error);
        }
    },

    deleteStudent: async (request, response, next) => {
        const id = request.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createError(400, "Invalid student ID"));
        }

        try {
            const student = await userModels.findByIdAndDelete(id);
            if (!student) {
                return next(createError(404, "Student not found"));
            }
            response.send(student);
        } catch (error) {
            next(error);
        }
    },
};