var fs =    require('fs');
var path =  require('path');

var root = './';   // floppy mapped file system root

// sets the root of the floppy server
exports.root = function(newroot) {
    root = newroot;  
};

// parse a url and respond with either the file or directory information
exports.parse = function(req, res) {
    console.log(root, req.params);
    var url = path.resolve(root, req.params[0]);
    
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
            var results = [];
            
            // loop through directory and stat each file
            for (var i = 0; i < dir.length; i++) {
                var name = dir[i];
                var fstat = fs.statSync(path.resolve(url, name));
                
                var file = { 'name': name,
                             'type': fstat.isFile() ? 'file' : 'directory'
                           };
                results.push(file);
            }
            
            // send back detailed directory
            res.send(results);
        }
        
    // else file does not exist and we respond with an error
    } else {
        var error = { 'error': 404 };
        res.send(error);
    }
};