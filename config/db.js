const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({})

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.log("message", error.message);
    }
}

module.exports = { connectDb }