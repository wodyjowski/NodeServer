var http = require('http');
var port = process.env.PORT || 80;

var server = http.createServer(function(req, res) {
    res.write('heroku looks very promising');
    res.end();
});


server.listen(port);