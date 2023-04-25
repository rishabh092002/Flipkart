const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mainRouter = require("./router/mainRouter");
const fileupload = require("express-fileupload");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(fileupload());

/** 
 * Initialise session
 */
app.use(expressSession({
    secret: "flipkarRouting_1312$32523",
    resave: false,
    saveUninitialized: false
}));

/**
 * initialise cookie
 */

app.use(cookieParser());

/**
 * Include main router 
 */
app.use("/", mainRouter);

/**
 * Initilise server with mention port
 */
const port = 3010;
app.listen(port, function () {
    console.log(`server started at port,${port}`)
});