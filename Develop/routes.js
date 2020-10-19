var path = require("path");
var fs = require("fs");

module.exports = function (app) {

    // Setting home html route to display home page
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "index.html"));
    })

    //GET routes
    app.get('/notes', function (req, res) {
        res.sendFile(path.join(__dirname, '/public/notes.html'));
    });
    app.get('/api/notes', function (req, res) {
        res.sendFile(path.join(__dirname, '/db/db.json'));
    });
    app.get('/api/notes/:id', function (req, res) {
        var saved = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
        res.json(saved[Number(req.params.id)]);
    });
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '/public/index.html'));
    });

    // POST route
    app.post('/api/notes', function (req, res) {
        var saved = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
        var newNote = req.body;
        var thisId = (saved.length).toString();
        newNote.id = thisId;
        saved.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(saved));
        res.json(saved);
        console.log('Saved Note: ', newNote);
    });


    //Delete route
    app.delete('/api/notes/:id', function (req, res) {
        var saved = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
        var nId = 0;
        console.log(`Delete note with ID ${req.params.id}`);
        saved = saved.filter(thisNote => {
            return thisNote.id != req.params.id;
        })
        for (thisNote of saved) {
            thisNote.id = nId.toString();
            nId++;
        }
        fs.writeFileSync('./db/db.json', JSON.stringify(saved));
        res.json(saved);
    });
}