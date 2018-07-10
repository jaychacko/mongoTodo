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

    db.collection("Users").findOneAndUpdate({
          _id:new ObjectID("5b35b8fccf45c8414ab52fb3")

},{
    $set:{
        name:"anu"
    },
    $inc:{
        age:2
    }
  
},{
    returnOriginal:false
}).then((result)=>{

    console.log(JSON.stringify(result,undefined,2))

})
});
// db.close
// {
//     "_id" : ObjectId("5b31cab19281081824556afc"),
//     "name" : "jay",
//     "age" : "27",
//     "location" : "Houston"
// }