//create web server
const express = require('express');
const app = express();
const port = 3000;

//add static files
app.use(express.static('public'));

//add body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//add database
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('comment.json');
const db = low(adapter);

//add database default data
db.defaults({ comment: [] }).write();

//add pug
app.set('view engine', 'pug');

//add route
app.get('/', (req, res) => {
    res.render('index');
})

//add post route
app.post('/comment', (req, res) => {
    db.get('comment').push(req.body).write();
    res.redirect('/');
})

//add comment route
app.get('/comment', (req, res) => {
    res.render('comment', { comment: db.get('comment').value() });
})

//server listen
app.listen(port, () => {
    console.log('server running on port ' + port);
})