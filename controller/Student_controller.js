const mongoose = require('mongoose');
const userModels = require('../model/Student_Model');
const createError = require('http-errors');


module.exports ={
   Allstudents: async(request,response, next)=>{
    try{
        const students = await userModels.find();
        response.send(students);
    } catch(error){
        console.log(error.message)
       
    }

    },
    addstudent:async(request,response,next)=>{
        try{
            const newStudent = await userModels(request.body);
            const result = newStudent.save();
            response.send(result);
        } catch(error){
            console.log(error.message)
            if(error.name === 'validationError'){
                return next(createError(422,error.message))
            }
        }
    },

    getStudentById:async(request,response,next)=>{
        try{
            const id = request.params.id;
            const student = await userModels.findById(id);
            response.send(student);
            console.log(`Received id ${id}`);
            if(!student){
                throw createError(404, 'student id not found')
            }
        }
        catch(erorr){
            console.log(erorr.message);
            if(erorr instanceof mongoose.CastError){
                return next(createError(404,'invalid student id'))
            }
            next(erorr);
        }
    },

    updateStudent: async(request,response,next)=>{
        const id = request.params.id;
        try{
            const update = request.body;
            const options = {new:true};
            const Newupdate = await userModels.findByIdAndUpdate(id,update,options);
           // const newupdate = await userModels.findByIdAndUpdate(request.params.id,request.body,{new:true})
            response.send(Newupdate);
            console.log(`Received id ${id}`);
            if(!Newupdate){
                throw createError(404, 'student id not found')
            }
        } 
        catch(error){
            console.log(error.message);
            if(error instanceof mongoose.CastError){
                return next(createError(400,'invalid student id'))
            }
        }
    },

    patchStudent:async(request,response,next)=>{
        const id = request.params.id;
        console.log(`Received id ${id}`);
        try{
            const update = request.body;
            const options = {new:true};
            // const Newupdate = await userModels.findByIdAndUpdate(request.params.id,request.body,{new:true});
            const Newupdate = await userModels.findByIdAndUpdate(id, update,options)
            response.send(Newupdate);
            if(!Newupdate){
                throw createError(404, 'student id  not found')
            }
        } 
        catch(error){
            console.log(error.message);
            if(error instanceof mongoose.CastError){
                return next(createError(400,'invalid student id'))
            }
        }
    },

    deleteStudent: async(request,response,next)=>{
        try{
            // const id = request.params.id;
            const student = await userModels.findByIdAndDelete(request.params.id);
            response.send(student);
            if(!student){
                throw createError(404, 'Student not found')
            }
        }
        catch(error){
            console.log(error.message);
            if(error instanceof mongoose.CastError){
                return next(createError(404,'invalid student id'))
            }
        }
    }
}



