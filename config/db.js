const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({})

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        throw new Error;
    }
}

module.exports = { connectDb }