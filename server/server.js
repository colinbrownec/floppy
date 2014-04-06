var express = require('express');
var app = express();

// respond to all HTTP GET requests
app.all('*', function(req, res) {
    res.send('Hello <strong>floppy</strong> user!');
});

// start listening for HTTP requests
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});