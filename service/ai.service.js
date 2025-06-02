const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");
dotenv.config({});

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenAI({apiKey: GEMINI_API_KEY});

const getFormat = async (data) => {
  const res = await genAI.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: `please give me conise and paragraph summary of this data \n\n ${data}`,
  });
  return res.text;
};

module.exports = {getFormat}