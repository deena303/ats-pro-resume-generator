import { getAtsScore } from "../services/atsApi";
import { useState } from "react";


function AtsForm() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await getAtsScore(jobDescription, resumeText);
      setResult(data);
    } catch (error) {
      alert("Error calculating ATS score");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>ATS Resume Match</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Paste Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={5}
        />

        <textarea
          placeholder="Paste Resume Text"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          rows={5}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Check Match"}
        </button>
      </form>

      {result && (
        <div>
          <h3>Match Score: {result.matchScore}%</h3>
          <p>Matched Keywords:</p>
          <ul>
            {result.matchedKeywords.map((word) => (
              <li key={word}>{word}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AtsForm;
