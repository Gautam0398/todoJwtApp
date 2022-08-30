const express = require('express');
const mongoose = require('mongoose');
const app = express()


const indexRoutes = require('./routes/index');
const todoRoutes = require('./routes/todo');
const UserRoutes = require('./routes/auth');


mongoose.connect("mongodb://localhost:27017/TodoDb", { useNewUrlParser: true, useUnifiedTopology: true });
var DB = mongoose.connection;

DB.on("error", console.error.bind(console, "connection error"));

DB.once("open", function () {
    console.log("we are connected to Mongo!");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use('/api', indexRoutes);
app.use('/api/todo', todoRoutes);
app.use('/api/User', UserRoutes);




app.listen(3000, () => {
    console.log("Server started");
})