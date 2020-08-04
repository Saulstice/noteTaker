var noteData = require("./db/db.json");
var path = require("path");
var fs = require("fs");
const { json } = require("express");

console.log(noteData);
module.exports = function (app) {
    // Setting home html route to display home page
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "index.html"));
    })

    // Setting notes html route to display notes
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "/public/notes.html"));

    })



    // Setting notes api route to display data as json
    app.get("/api/notes", function (req, res) {
        res.json(noteData);
    })

    // Setting notes api route up so people can post notes
    app.post("/api/notes", function (req, res) {
        console.log(req.body);
        console.log(noteData);
        // Reading notes data, adding new notes, then rewriting all to json
        fs.readFile("./db/db.json", "utf8", function (error, data) {
            console.log(data)
            if (error) {
                return error;
            }

            var json = JSON.parse(data)
            json.push(req.body)
            fs.writeFile("./db/db.json", JSON.stringify(json), function (err) {
                if (err) throw err;
                console.log("Note added");
            })
        })
        res.json(true);
    })

    app.delete("/api/notes/:title", function (req, res) {
        var id = Object.keys(req.body);
        fs.readFile("./db/db.json", "utf8", function (error, data) {

            if (error) throw error;

            var json = JSON.parse(data)
            var deleted = []

            json.forEach(thing => {
                if (thing.title === id[0]) {
                    console.log(`Shoot me: ${thing.title}`);
                } else {
                    deleted.push(thing);
                }
            });
            fs.writeFile("./db/db.json", JSON.stringify(deleted), function (err) {
                if (err) throw err;
                console.log("Note deleted");
            });

        })

    });
}