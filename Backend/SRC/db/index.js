const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const ConnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/dataneuron`);
        console.log(`Mongo DB connection Host !!! ${ConnectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Error", error);
        process.exit(1);
    }
};

module.exports = connectDB;
