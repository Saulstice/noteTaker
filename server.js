// Downloading all dependencies needed
var express = require("express");
var fs = require('fs')
var app = express();



//Setting port location
var PORT = process.env.PORT;


// Sets up Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

require("./routes.js")(app);

// Turning on port
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});