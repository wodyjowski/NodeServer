var http = require('http');
var port = process.env.PORT || 90;
var number = 0;

var server = http.createServer(function(req, res) {
    console.log(req);
    res.write('xxxxx ' + ++number);
    res.end();
});


server.listen(port);