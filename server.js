const express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

var mustacheExpress = require('mustache-express');
const app = express();

const sequelize = new Sequelize('lech', 'postgres', 'sa', {
    // gimme postgres, please!
    dialect: 'postgres'
  })

  class User extends Sequelize.Model {}
User.init({
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
}, { sequelize, modelName: 'user' });

sequelize.sync()
  .then(() => User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });


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

