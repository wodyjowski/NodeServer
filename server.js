var http = require('http');
var port = process.env.PORT || 90;
var number = 0;

var server = http.createServer(function(req, res) {
    res.write('xxxxx ' + ++number);
    res.end();2
});


server.listen(port);