const fs = require("fs");
const pdf = require("pdf-parse");
const dotenv = require("dotenv");
const path = require('path')
dotenv.config({});
const baseDirectory = process.env.BASE_DIRECTORY;

const extractData = async (filePath) => {
  try {
    let dataBuffer = fs.readFileSync(filePath);
    let response = await pdf(dataBuffer);
    return response.text;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {extractData};