var mongoose = require('mongoose');

var user = mongoose.model('User', {
    email: {
        type: String,
        require:true,
        minlength:4,
        trim:true
    }
});


module.exports = {
    user
}