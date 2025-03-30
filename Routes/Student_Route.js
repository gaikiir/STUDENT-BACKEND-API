const express = require('express');
const route = express.Router();
const {verifyuserAccessToken} = require('../helpers/Jwthelpers')
const controller = require('../controller/Student_controller');


route.get('/Allstudents',controller.Allstudents)
// get student by their id 
route.get('/getStudentById/:id', controller.getStudentById)
//post use to create anew instance
//route.post('/addstudent',verifyuserAccessToken, controller.addstudent);
route.post('/addstudent', controller.addstudent);
//post use to update or replace existing instance 
route.put('/updateStudent/:id',controller.updateStudent);
//pathc use to update existing instance only
route.patch('/patchStudent/:id', controller.patchStudent)

//delete use to remove an instance 
route.delete('/deleteStudent/:id',controller.deleteStudent)

//export the routes so that we can use them in the app.js 
module.exports = route;

