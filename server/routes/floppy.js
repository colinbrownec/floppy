var fs =    require('fs');
var path =  require('path');

var root = './';   // floppy mapped file system root

// sets the root of the floppy server
exports.root = function(newroot) {
    root = newroot;  
};

// parse a url and respond with either the file or directory information
exports.parse = function(req, res) {
    var url = path.resolve(root + req.params[0]);
    
    /* calls are synchronous to immediately handle this request */
    
    // validate path and do a simple stat
    if (fs.existsSync(url)) {
        var stat = fs.statSync(url);
        
        // if it is a file return the actual file
        if (stat.isFile()) {
            res.download(url);
        }

        // if it is a directory return the contents
        if (stat.isDirectory()) {
            var dir = fs.readdirSync(url);
            res.send(dir);
        }
        
    // else file does not exist and we respond with an error
    } else {
        var error = { 'error': 404 };
        res.send(error);
    }
};