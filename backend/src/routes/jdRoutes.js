const express = require("express");
const router = express.Router();
const { extractKeywords } = require("../services/nlpService");

router.post("/analyze", (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ error: "Job description is required" });
    }

    const keywords = extractKeywords(jobDescription);

    res.json({
      keywords,
      message: "JD analyzed using local NLP"
    });
  } catch (error) {
    res.status(500).json({
      error: "JD analysis failed",
      details: error.message
    });
  }
});

module.exports = router;
