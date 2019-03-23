const mongoose = require("mongoose");
const URI = 'mongodb://localhost:27017/users-tasks';

//connect mongodb
mongoose.connect(URI, {useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false })
    .then(db => console.log('DB is Connected'))
    .catch(err => console.error(err));

module.exports = mongoose;