const {ObjectID} = require('mongodb')

const {mongoose} = require('../server/db/mongoose')
const {Todo} = require('../server/models/todo')
const {user} = require('../server/models/user')




// var id ='5b3efbeea7103e46a4845bc89';

// if(!ObjectID.isValid(id)){

//     console.log("id not valid")

// }else{
//     Todo.find({
//         _id:id
//     }).then((todos)=>{
    
//         console.log('todos ',todos)
//     })
    
    
//     Todo.findOne({
//         _id:id
//     }).then((todo)=>{
    
//         console.log('todo ',todo)
//     })
    
//     Todo.findById(id).then((id)=>{
//        if(!id){
//            return console.log("id not found")
//        }
//         console.log('id ',id)
//     }).catch((e)=>{
//         console.log(e)
//     })
// }


var id = "5b3b0bea98882fe00f4618f5"

if(!ObjectID.isValid(id)){

    console.log("id not valid")

}else{
       
    user.findById({
        _id:id
    }).then((users)=>{
    
        console.log('users ',users)
    }).catch((e)=>{
        console.log(e)
    })
}