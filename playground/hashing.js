const {SHA256} = require('crypto-js');

const jwt = require('jsonwebtoken');

// var message = "i am a user number 3";

// var hash =SHA256(message).toString();
// console.log("message:", message)

// console.log("messageHash:", hash)



// var data  = {
//     id:4
// };

// var token =  {
//     data:data,
//     hash:SHA256(JSON.stringify(data)+'somesecret').toString()
// }


// var resultJHash = SHA256(JSON.stringify(token.data)+'somesecret').toString()


// if(resultJHash === token.hash){
//     console.log('data was NOT changed')
// }else{
//    console.log(" data was changed, DONT TRUST");
// }

var data  = {
    id:4
};

var token = jwt.sign(data,'123abc');
console.log('token :' ,token)

var decoded = jwt.verify(token+1,'123abc')
console.log('decoded :' ,decoded)


// if(resultJHash === token.hash){
//     console.log('data was NOT changed')
// }else{
//    console.log(" data was changed, DONT TRUST");
// }