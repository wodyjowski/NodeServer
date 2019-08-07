var http = require('http');
var port = process.env.PORT || 90;
var number = 0;

var server = http.createServer(function(req, res) {
    res.write('xxxxx ' + ++numer);
    res.end();
});


server.listen(port);