const express = require('express');
const route = express.Router();
const lectcontrollers = require('../controller/Lecturer_controller');
route.get('/Alllecturers',lectcontrollers.getAllLecturers);
route.put('/addlecturer',lectcontrollers.addLecturer);

module.exports = route;