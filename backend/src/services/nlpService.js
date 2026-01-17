const natural = require("natural");

const tokenizer = new natural.WordTokenizer();
const stopwords = new Set(natural.stopwords);

function extractKeywords(jobDescription) {
  if (!jobDescription || typeof jobDescription !== "string") {
    throw new Error("Invalid job description");
  }

  const tokens = tokenizer
    .tokenize(jobDescription.toLowerCase())
    .filter(word => word.length > 2)
    .filter(word => !stopwords.has(word));

  const frequency = {};
  tokens.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  return Object.keys(frequency)
    .sort((a, b) => frequency[b] - frequency[a])
    .slice(0, 10);
}

module.exports = { extractKeywords };
