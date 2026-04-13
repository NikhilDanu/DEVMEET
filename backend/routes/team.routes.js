const express = require("express");
const routes = express.Router();

const auth = require("../middleware/jwt");
const {createTeam , joinTeam , getAllTeams , accept , reject, getRequests , getTeamByID} = require("../controllers/team.controller");

routes.post("/createTeam", auth  , createTeam);
routes.post("/joinTeam" , auth , joinTeam);
routes.get("/getAllTeams" , auth , getAllTeams );
routes.post("/accept" , auth , accept);
routes.post("/reject" , auth , reject);
routes.get("/request" , auth , getRequests)
routes.get("/:teamId", getTeamByID);


module.exports = routes;
