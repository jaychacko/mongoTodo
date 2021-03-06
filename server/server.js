require('./config/config')
var express = require('express');
var bodyParser = require('body-parser');
var {
    authenticate
} = require('./middleware/authenticate')
const {
    ObjectID
} = require('mongodb')

var {
    mongoose
} = require('./db/mongoose');
var {
    Todo
} = require('./models/todo');
var {
    User
} = require('./models/user');
const _ = require('lodash');



var app = express();

const Port = process.env.PORT || 5000;

app.use(bodyParser.json())

app.post('/todos',authenticate, (req, res) => {

    var todo = new Todo({
        text: req.body.text,
        _creator:req.user._id
    })

    todo.save().then((doc) => {
        console.log("mongo save Succeded")

    }, (e) => {
        console.log("mongo save failed", e)
        res.status(400).send(e);
    })
})


app.get('/todos',authenticate, (req, res) => {
    Todo.find({_creator:req.user._id}).then((todos) => {
        res.send({todos})
    }, (e) => {
        console.log("mongo ask failed", e)
        res.status(400).send(e);
    })
})

app.get('/todos/:id', (req, res) => {
    // var id =JSON.stringify(req.params);
    var id = req.params.id;


    if (!ObjectID.isValid(id)) {
        res.status(404).send("id not valid");
    } else {
        Todo.findById({
            _id: id
        }).then((todo) => {
            if (!todo) {
                return res.status(404).send()
            }
            res.send({
                todo
            })
            console.log("mongo ask Succeded", todos)
        }, (e) => {
            res.status(400).send(e);
        })
    }
})

app.delete('/todos/:id', (req, res) => {

    var id = req.params.id
    if (!ObjectID.isValid(id)) {
        res.status(404).send("id not valid");
    } else {
        Todo.findOneAndRemove({
            _id: id
        }).then((todos) => {
            res.send({
                todos
            })
            console.log("mongo ask Succeded", todos)
        }, (e) => {
            console.log("mongo ask failed", e)
            res.status(400).send(e);
        })
    }


})


app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, {
            $set: body
        }, {
            new: true
        }).then((todo) => {
            if (!todo) {
                return res.status(400).send();
            }

            res.send({
                todo
            });
        })
        .catch((err) => {
            res.status(400).send();
        });
});


app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    // var user = new User({
    //     email: body.email,
    //     password: body.password
    // })
    var user = new User(body)

    if (body.email && body.password) {
        user.save().then((data) => {
            return user.generateAuthToken();
        }).then((token) => {
            console.log('token at the server: ', token);
            res.header('x-auth', token).send(user);
        }).catch((e) => {
            res.status(400).send(e);
        })
    }


})


app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user)
})

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token)=>{
            console.log('token at the server: ', token);
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();

    })

})

app.delete('/users/me',authenticate,(req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send()
    },()=>{
        res.status(400).send()

    })
})

app.listen(Port, () => {
    console.log(`Port opened at ${Port}`)
})

module.exports = {
    app
}






//https://fast-ocean-19014.herokuapp.com/todoslo