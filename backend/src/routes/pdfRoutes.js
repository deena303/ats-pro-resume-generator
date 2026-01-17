const express = require("express");
const router = express.Router();
const { generateResumePDF } = require("../services/pdfService");

router.post("/generate", async (req, res) => {
  try {
    const pdf = await generateResumePDF(req.body);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf"
    });

    res.send(pdf);
  } catch (error) {
    res.status(500).json({ error: "PDF generation failed" });
  }
});

module.exports = router;
