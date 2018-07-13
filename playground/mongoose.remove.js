const {ObjectID} = require('mongodb')

const {mongoose} = require('../server/db/mongoose')
const {Todo} = require('../server/models/todo')
const {user} = require('../server/models/user')



// Todo.remove({}).then((result)=>{
//     console.log("successfully removed",result);
// },(e)=>{
//     console.log("did not work")
// });


var id = "5b482199e38c7195a4343d65"
Todo.findOneAndRemove({_id:id}).then((result)=>{
    console.log("successfully removed",result);
},(e)=>{
    console.log("did not work")
});