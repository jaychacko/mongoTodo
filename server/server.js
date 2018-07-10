var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb')

var {
    mongoose
} = require('./db/mongoose');
var {
    Todo
} = require('./models/todo');
var {
    user
} = require('./models/user');



var app = express();

app.use(bodyParser.json())

app.post('/todos', (req, res) => {

    console.log("post got hit", req.body)
    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc) => {
        console.log("mongo save Succeded")

    }, (e) => {
        console.log("mongo save failed", e)
        res.status(400).send(e);
    })
})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
        console.log("mongo ask Succeded",todos)
    }, (e) => {
        console.log("mongo ask failed", e)
        res.status(400).send(e);
    })
})
app.get('/todos/:id', (req, res) => {
    // var id =JSON.stringify(req.params);
    var id =req.params.id;


    if(!ObjectID.isValid(id)){
        res.status(404).send("id not valid");
    }else{
        Todo.findById({_id:id}).then((todo) => {
            if(!todo){
                return res.status(404).send()
            }
            res.send({todo})
            console.log("mongo ask Succeded",todos)
        },(e)=>{
            res.status(400).send(e);
        })
    }
})

app.listen(5000, () => {
    console.log('Port opened at 5000')
})

module.exports = {
    app
}