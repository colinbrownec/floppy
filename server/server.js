var express = require('express');
var floppy = require('./routes/floppy');

var app = express();

// respond to all HTTP GET requests in /root/
app.get('/root/*', function(req, res) {
    floppy.parse(req, res);
});

// start listening for HTTP requests
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});