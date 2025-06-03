const axios = require("axios");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
dotenv.config({});

const MURF_API_KEY = process.env.MURF_API_KEY
const apiUrl = "https://api.murf.ai/v1/speech/stream";

const saveAudioStreamToFile = async (summary, fileName) => {
  const requestBody = {
    text: summary,
    voiceId: "en-US-natalie",
  };
  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
        "api-key": MURF_API_KEY,
      },
      responseType: "stream",
    });
    const outputFilePath = `./uploads/audio_${encodeURIComponent(fileName)}.mp3`;
    const writer = fs.createWriteStream(outputFilePath);
    response.data.pipe(writer);
    writer.on("finish", () => {
      console.log(`Audio saved to ${outputFilePath}`);
    });
    writer.on("error", (err) => {
      console.error("Error writing to file:", err);
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}

module.exports = { saveAudioStreamToFile }