const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
    {
        fileName: {
            type: String,
            required: [true, "file name is mandatory"]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("File", fileSchema);
