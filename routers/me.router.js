const express = require("express");
const meController = require("../controllers/me.controller");
const meRouter = express.Router();

meRouter.get("/", meController.getMe);

module.exports = meRouter;
