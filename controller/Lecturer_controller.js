const mongoose = require('mongoose');
const LectModel = require('../model/Lecturer_Model');
const createError = require('http-errors');

module.exports={
    addLecturer:async(request,response,next)=>{
        try{
            const newLecturer = new LectModel(request.body);
            const result = newLecturer.save();
            response.send(result)
        }
        catch(err){
            
        }
    }
}