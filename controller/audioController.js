const fileModel = require("../model/fileModel");
const { getFormat } = require("../service/ai.service");
const { extractData } = require("../service/getExtract");
const { saveAudioStreamToFile } = require("../service/textToAudio.service");

const uploadPDf = async (req, res) => {
  try {
    const fileName = req.file.originalname;
    const filepath = req.file.path;
    const data = await extractData(filepath);
    const getFormatData = await getFormat(data);
    await saveAudioStreamToFile(getFormatData);
    await fileModel.create({ fileName: fileName });
    res.status(200).json({
      message: `pdf convert Successfully`,
      status: true,
    })
  } catch (error) {
    console.error("Error processing PDF:", error);
    res.status(500).json({ error: "Failed to process PDF" });
  }
};

const getFileName = async (req, res) => {
  try {
    const files = await fileModel.find();
    return res.status(200).json({
      message: "File data retrieved",
      status: true,
      data: files,
    })
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Error fetching files" });
  }
}

module.exports = { uploadPDf, getFileName };
