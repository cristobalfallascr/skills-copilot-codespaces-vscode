//create web server
//create a web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
//connect to database
mongoose.connect('mongodb://localhost:27017/commentsDB', {useNewUrlParser: true, useUnifiedTopology: true});
//create schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});
//create model
const Comment = mongoose.model('Comment', commentSchema);
//add data to database
// const comment = new Comment({
//     name: 'Anh',
//     comment: 'Hello guys'
// });
// comment.save();
//set up template engine
app.set('view engine', 'ejs');
//set up static files
app.use(express.static('public'));
//use body-parser
app.use(bodyParser.urlencoded({extended: true}));
//render data to view
app.get('/', (req, res) => {
    Comment.find({}, (err, data) => {
        if(err) {
            console.log(err);
        } else {
            res.render('index', {comments: data});
        }
    });
});
//post data to database
app.post('/', (req, res) => {
    const comment = new Comment(req.body);
    comment.save();
    res.redirect('/');
});
//listen to port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

