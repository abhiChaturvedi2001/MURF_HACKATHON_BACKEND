const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({})

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.log("message", error.message);
    }
}

module.exports = { connectDb }