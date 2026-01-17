const { extractKeywords } = require("./nlpService");

function calculateMatchScore(jobDescription, resumeText) {
  const jobKeywords = extractKeywords(jobDescription);
  const resumeKeywords = extractKeywords(resumeText);

  const matchedKeywords = jobKeywords.filter(keyword =>
    resumeKeywords.includes(keyword)
  );

  const matchScore =
    jobKeywords.length === 0
      ? 0
      : Math.round((matchedKeywords.length / jobKeywords.length) * 100);

  return {
    jobKeywords,
    resumeKeywords,
    matchedKeywords,
    matchScore,
  };
}

module.exports = { calculateMatchScore };
