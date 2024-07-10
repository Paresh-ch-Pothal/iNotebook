const mongoose = require('mongoose');
const MongoURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = async () => {
    try {
        await mongoose.connect(MongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false, // Uncomment if needed
            // useCreateIndex: true // Uncomment if needed
        });
        console.log("Connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectToMongo;
