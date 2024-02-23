const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(express.static("public"));

// Import routes
const userRouter = require('./routes/user.routes.js');

app.use("/users", userRouter);

module.exports = { app };
