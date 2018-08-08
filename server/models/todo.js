var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        require:true,
        minlength:1,
        trim:true
    },
    completed: {
        type: Boolean,
        default:false
    },

    completedAt: {
        type: String,
        default:null
    },
    _creator:{
        require:true,
        type:mongoose.Schema.Types.ObjectId,
    }
});

module.exports = {
    Todo
}