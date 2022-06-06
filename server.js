const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

const authRouter = require("./routers/auth.router");
const booksRouter = require("./routers/books.router");
const meRouter = require("./routers/me.router");
const usersRouter = require("./routers/users.router");

const { authorizeUser } = require("./middlewares");

app.use(express.json());

app.use("/auth", authRouter);
app.use("/books", booksRouter);
app.use("/me", authorizeUser, meRouter);
app.use("/users", authorizeUser, usersRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
