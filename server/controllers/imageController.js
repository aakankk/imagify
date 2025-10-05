import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;
    const user = await userModel.findById(userId);

    if (!user || !prompt) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (user.credits <= 0) {
      return res.json({
        success: false,
        message: "Not enough credits. Please buy more credits",
        credits: user.credits,
      });
    }

    if (!process.env.CLIPDROP_API) {
      return res.json({
        success: false,
        message: "CLIPDROP_API key not found. Please set it in .env",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const response = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );

    if (response.status !== 200) {
      return res.json({
        success: false,
        message: "ClipDrop rejected request",
        details: response.data.toString(),
      });
    }

    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    // Decrease credits and get updated user
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { credits: user.credits - 1 },
      { new: true } // return updated document
    );

    return res.json({
      success: true,
      message: "Image generated successfully!",
      image: resultImage,
      credits: updatedUser.credits,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

