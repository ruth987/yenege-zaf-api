const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

exports.connect = () => {

    mongoose.connect(MONGO_URI)
            .then(() => console.log('MongoDB connected successfully'))
            .catch(err => console.error('Error connecting to MongoDBgit'))
}