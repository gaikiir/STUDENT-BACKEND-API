const mongoose = require('mongoose');
const assign_model = require('../model/Assigment');
const createError = require('http-errors');

 module.exports = {
     AddAssign: async (request, respond, next) => {
         try {
           const addAssignment = new assign_model(request.body);
           const saveAssign = addAssignment.save();
           respond.send(saveAssign);
         } catch (error) {
             if (error.name === 'validationError') {
                 next(createError(422,error.message))
             } else {
                 next(error)
             }
         }
     },
     
     getAllAssign: async (request, respond, next) => {
         try {
             const allAssign = await assign_model.find();
             respond.send(allAssign);
         } catch (error) {
             next(error)
         }
     }
}

