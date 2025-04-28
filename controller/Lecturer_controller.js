const mongoose = require('mongoose');
const LectModel = require('../model/Lecturer_Model');
const createError = require('http-errors');

module.exports={
    getAllLecturers:async(request,response,next)=>{
        try{
            const lecturers = await LectModel.find();
            response.send(lecturers)
        } 
        catch(error){
            console.log(error.message);
        }
    },
    addLecturer:async(request,response,next)=>{
        try{
            const newLecturer = await LectModel(request.body);
            const result = newLecturer.save();
            response.send(result)
        }
        catch(error){
            console.log(error.message);
            if(error.name === "validation"){
                next(createError(422,error.message))
            }
        }
    },
    getLecturerById: async(request,response,next)=>{
        try{
            const id = request.params.id;
            const lecturer = await LectModel.findById(id);
            const result = lecturer.save();
            response.send(result)
            if(!lecturer){
                throw createError(404,"Lecturer does not exist")
            }
        }
        catch(error){
            console.log(error.message);
          if(error instanceof mongoose.CastError){
            throw next(createError(404,"Invalid lecturer Id"));
          }
          next(error)
        }
    },
    updateLecture: async(request,response,next)=>{
        try{
            const id = request.params.id;
            console.log("http received id",id)
            const update = request.body;
            const options = {new:true};
            const result = await LectModel.findByIdAndUpdate(id,update,options);
            response.send(result);
            if(!result){
                throw createError(404,"lecturer does not exist");
            }
        }
        catch(error){
            if(!result){
                throw next(createError(400,"Lecturer Id does not exist"));
            }
        }
    }
}