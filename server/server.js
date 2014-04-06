var express = require('express');
var floppy = require('./routes/floppy');

var app = express();

// setup cross origin request middleware
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// respond to all HTTP GET requests in /root/ and /root
app.get('/root/*', floppy.parse);
app.get('/root', function(req, res) {
    req.params = [''];
    floppy.parse(req, res);
});

// start listening for HTTP requests
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});