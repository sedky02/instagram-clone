const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const  {DB_URI, PORT}= require("./config") ;

 mongoose 
 .connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
 })   
 .then((result) => {
        console.log("Database connected!") ;
        app.listen(PORT,
            () => console.log("Server running")
        )
        
     })
 .catch(err => console.log(err));

const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const imageRoute = require("./routes/image");

app.use(cors())
app.use(express.json());
app.use("/api/users", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/image", imageRoute);
