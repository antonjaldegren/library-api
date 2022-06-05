const express = require("express");
const booksRouter = require("./routers/books.router");
const authRouter = require("./routers/auth.router");
const usersRouter = require("./routers/users.router");
const meRouter = require("./routers/me.router");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use("/owners", ownersRouter);
app.use("/cars", carsRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
