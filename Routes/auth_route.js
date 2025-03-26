const express = require('express');
const routes = express.Router();
const auth_controller = require('../controller/auth_controller');

routes.post('/Register',auth_controller.Register);

routes.get('/login',auth_controller.login);

module.exports = routes;
