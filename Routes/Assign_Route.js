const express = require('express');
const routes = express.Router();
const assignController = require('../controller/Assign_Controller');

routes.post("/addAssign/", assignController.AddAssign);
routes.get("/getAllAssign/", assignController.getAllAssign);

module.exports = routes;

