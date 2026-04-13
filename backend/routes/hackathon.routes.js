const express = require("express");
const routes = express.Router();

const admin = require("../middleware/admin.mddleware");
const auth = require("../middleware/jwt");

const { getHackathons  , createHackathon } = require("../controllers/hackathon.controller");


routes.get("/getHackathon", auth , getHackathons);
routes.post(" /createHackathon" , auth , admin, createHackathon);

module.exports = routes;