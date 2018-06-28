//const MongoClient = require('mongodb').MongoClient;
const {
    MongoClient,
    ObjectID
} = require('mongodb');

var obj = new ObjectID();

console.log(obj)


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {
        return console.log('Unable to connec to MongoDB server')
    }

    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp')

    db.collection("Users").find({name:"jay"}).toArray().then((docs) => {

        console.log(JSON.stringify(docs, undefined, 2))


    }, (err) => {
        console.log("unable to fetch todos ", err)
    })

});
// db.close