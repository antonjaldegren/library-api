const express = require("express");
const usersController = require("../controllers/users.controller");
const usersRouter = express.Router();

usersRouter.post("/lend", usersController.lendBook);
usersRouter.post("/return", usersController.returnBook);

module.exports = usersRouter;
