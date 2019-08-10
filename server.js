const express = require('express');
var bodyParser = require('body-parser');
var WebSocket = require('ws');
var WebSocketServer = require('ws').Server;

var mustacheExpress = require('mustache-express');
const app = express();


app.engine('html', mustacheExpress());
app.use(express.static('public'))
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({
    extended: true
}));

const port = process.env.PORT || 80;

var messageList = []

app.post('/', (req, res) => {
    messageList.unshift({ name: req.body.name, message: req.body.message });
    res.header('Location', '/');
    res.redirect('/');
});

app.get('/', (req, res) => {
    res.render('index', { messageList })
});

var server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

var wss = new WebSocketServer({ server: server });

wss.on("connection", function (ws) {
    console.log("connected", new Date);

    ws.on('message', message => {
        var obj = JSON.parse(message);

        if(obj.name === '' || obj.message === '') return;

        messageList.unshift({ name: obj.name, message: obj.message });

        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(obj));
            }
        });

        console.log(message);
    });
});

