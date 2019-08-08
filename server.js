const express = require('express');
var pug = require('pug');
var bodyParser = require('body-parser')

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

app.post('/', (req, res) =>
{
    messageList.unshift({name: req.body.name, message: req.body.message});
    res.header('Location', '/');
    res.redirect('/');
});

app.get('/', (req, res) =>
{
    res.render('index', {messageList})
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

