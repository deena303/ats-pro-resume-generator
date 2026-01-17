const express = require("express");
const router = express.Router();
const { calculateMatchScore } = require("../services/atsService");

router.post("/score", (req, res) => {
  try {
    const { jobDescription, resumeText } = req.body;

    if (!jobDescription || !resumeText) {
      return res.status(400).json({
        error: "jobDescription and resumeText are required",
      });
    }

    const result = calculateMatchScore(jobDescription, resumeText);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: "ATS scoring failed",
      details: error.message,
    });
  }
});

module.exports = router;
