const express = require('express');
const cors = require('cors');
const passport = require('passport');
const authRoute=require("./routes/auth");
const projectsRoute=require("./routes/projects");

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
var app = express();

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
const db = require("./models");
db.sequelize.sync();


// Pass the global passport object into the configuration function
require('./config/passport')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


app.use("/auth",authRoute)


app.use(passport.authenticate("jwt",{session:false}))


app.use("/projects",projectsRoute)


app.get("/logout",passport.authenticate("jwt",{session:false}),(req,res)=>{
    req.logOut()
    res.send("logged out successfully")
})


app.listen(3000);