const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY
});

const generateImage = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    const image_url = response.data[0].url;

    console.log(image_url);

    return res.status(200).json({ result: image_url, message: "Image successfully generated!" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ result: error.message, message: "Image wasn't able to generate!" });
  }

}

module.exports = { generateImage };