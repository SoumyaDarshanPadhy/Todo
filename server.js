const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const date = require(__dirname+'/date.js');

const port = process.env.PORT ||3000;




let items = []

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))


app.get('/',(req, res) => {

    res.render('index',{title: 'My todo',day:date.getDate(),newItem: items});
});
app.post('/',(req, res) => {
    let task = req.body.task;
    items.push(task);
    res.render('index',{title: 'My todo',day:date.getDate(),newItem: items});
})


app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});