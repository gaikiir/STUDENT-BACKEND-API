const mongoose = require("mongoose");
const userModels = require("../model/Student_Model");
const createError = require("http-errors");

// Utility function to validate MongoDB ObjectId
const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createError(400, "Invalid student ID");
  }
};

// Utility function to validate required student fields
const validateStudentData = (data) => {
  const requiredFields = ["FirstName", "LastName", "Gender"];
  const missingFields = requiredFields.filter((field) => !data[field]);

  if (missingFields.length > 0) {
    throw createError(
      422,
      `Missing required fields: ${missingFields.join(", ")}`
    );
  }
};

module.exports = {
  Allstudents: async (request, response, next) => {
    try {
      const students = await userModels.find();
      response.send(students);
    } catch (error) {
      next(error);
    }
  },

  addstudent: async (request, response, next) => {
    try {
      validateStudentData(request.body);
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
    try {
      const id = request.params.id;
      
      const student = await userModels.findById(id);
      isValidObjectId(id);
      console.log(`http received id ${id}`);
      if (!student) {
        throw createError(404, "Student not found");
      }
      response.send(student);
    } catch (error) {
      next(error);
    }
  },

  updateStudent: async (request, response, next) => {
    try {
      const { id } = request.params;
      console.log(`http received id ${id}`);

      const updates = await userModels.findByIdAndUpdate(id, request.body, {
        new: true,
      });
      isValidObjectId(id);
      validateStudentData(request.body);
      if (!updates) {
        throw createError(404, "Student not found");
      }
      response.send(updates);
    } catch (error) {
      next(error);
    }
  },

  patchStudent: async (request, response, next) => {
    try {
      const { id } = request.params;
      isValidObjectId(id);
      validateStudentData(request.body);
      // For PATCH, we don't validate all fields since it's a partial update
      const patched = await userModels.findByIdAndUpdate(id, request.body, {
        new: true,
      });

      if (!patched) {
        throw createError(404, "Student not found");
      }
      response.send(patched);
    } catch (error) {
      next(error);
    }
  },

  deleteStudent: async (request, response, next) => {
    try {
      const { id } = request.params;
      isValidObjectId(id);

      const deletes = await userModels.findByIdAndDelete(id);
      if (!deletes) {
        throw createError(404, "Student not found");
      }
      response.send(deletes);
    } catch (error) {
      next(error);
    }
  },
};
