const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const  {DB_URI, PORT}= require("./config") ;

mongoose 
 .connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
 })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

app.use(cors())
app.use(express.json());
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);


app.listen(PORT,
    () => console.log("Server running")
)
