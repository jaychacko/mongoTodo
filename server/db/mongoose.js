var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI||'mongodb://127.0.0.1:27017/TodoApp');
module.exports = {
    // mongoose = mongoose
    mongoose
}

