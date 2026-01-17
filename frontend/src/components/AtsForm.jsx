import React, { useState } from "react";
import axios from "axios";

const AtsForm = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckMatch = async () => {
    setError("");
    setResult(null);

    if (!jobDescription || !resumeText) {
      setError("Please fill both Job Description and Resume.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/ats/score",
        { jobDescription, resumeText }
      );
      setResult(response.data);
    } catch {
      setError("Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>ATS Resume Match</h2>

      <textarea
        placeholder="Paste Job Description"
        rows={6}
        cols={60}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Paste Resume Text"
        rows={6}
        cols={60}
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />

      <br /><br />

      <button onClick={handleCheckMatch} disabled={loading}>
        {loading ? "Checking..." : "Check Match"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Match Score: {result.matchScore}%</h3>

          <h4>Matched Keywords:</h4>
          <ul>
            {result.matchedKeywords.map((kw, i) => (
              <li key={i}>{kw}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AtsForm;
