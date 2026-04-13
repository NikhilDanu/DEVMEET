const express = require("express");
const routes = express.Router();

const {signup , login} = require("../controllers/user.controller");

routes.post("/signup" , signup);
routes.post("/login", login);

module.exports = routes;