const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const connectDB = async() => {
    try{
        const con = await mongoose.connect(process.env.MONGO_URI, {
            //newUrlParser: true,
            //newUnifiedTopology: true,
            //useFindAndModify: false,
            //useCreateIndex: true,
        })
        console.log('MongoDB Connected!');
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;