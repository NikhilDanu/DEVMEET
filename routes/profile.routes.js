const express = require("express");
const routes = express.Router();

const auth = require("../middleware/jwt"); 
const { createProfile, getProfile } = require("../controllers/profile.controller");

routes.post("/create", auth , createProfile);
routes.get("/getProfile", auth, getProfile);

module.exports = routes;