const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const date = require(__dirname+'/date.js');

const port = process.env.PORT ||3000;

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

mongoose.connect("mongodb://localhost:27017/Todo", {useNewUrlParser: true});

const tasksSchema = {
    task : String
};

const Task = mongoose.model('Task', tasksSchema);

app.get('/',(req, res) => {

    Task.find({}, function(err, tasks) {
        res.render('index',{title: 'My todo',day:date.getDate(),newItem: tasks});
    });
    
});
app.post('/',(req, res) => {
    let data = req.body.task;
    const task = new Task({
        task: data
    });
    task.save().then(()=>console.log("Saved Data"));
    res.redirect('/');
})

app.post('/delete',(req, res) => {
    const checked = req.body.deleteItem;
    // Task.findByIdAndRemove(checked, function(err) {
    //     if(err){
    //         console.log(err);
    //     }
    // });
    Task.findByIdAndRemove(checked, function(err) {
        if(err){
            console.log(err);
        }
    });
    res.redirect('/');
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});