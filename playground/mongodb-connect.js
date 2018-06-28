//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj  = new ObjectID();

console.log(obj)


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {
        return console.log('Unable to connec to MongoDB server')
    }

   console.log('Connected to MongoDB server');

//     const db = client.db('TodoApp')

//     // db.collection('Todos').insertOne({

//     //     text: 'something to do',
//     //     completed: 'false'
//     // }, (err, result) => {
//     //     if (err) {
//     //         return console.log("unable to inset tanle", err)
//     //     }
//     //     console.log(JSON.stringify(result.ops, undefined, 2))
//     // });



    
//     db.collection('Users').insertOne({

//         name: 'jay',
//         age: '27',
//         location:'Houston'
//     }, (err, result) => {
//         if (err) {
//             return console.log("unable to inset tanle", err)
//         }
//         console.log(JSON.stringify(result.ops, undefined, 2))
//     });

//     client.close();
});