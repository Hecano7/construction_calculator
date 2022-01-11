var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();
var path = require('path');
app.use(express.static('public'));


app.listen(PORT, () => {
    console.log("listening at http://localhost:5000")
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/even-spaced', function(req, res) {
    res.sendFile(path.join(__dirname + '/evenly-spaced.html'));
});
