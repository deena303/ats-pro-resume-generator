import React, { useState } from "react";
import { fetchAtsScore, resumeToPlainText, downloadResumePDF } from "../services/api";
import "./AtsSection.css";

function ScoreRing({ score }) {
    const radius = 38; const circ = 2 * Math.PI * radius;
    const offset = circ - (score / 100) * circ;
    const color = score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444";

    return (
        <div className="score-ring-wrapper">
            <svg width="90" height="90" viewBox="0 0 96 96">
                <circle cx="48" cy="48" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <circle cx="48" cy="48" r={radius} fill="none" stroke={color} strokeWidth="8" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 48 48)" style={{ transition: "all 0.8s" }} />
            </svg>
            <div className="score-ring-text" style={{ color }}>{score}%</div>
        </div>
    );
}

function AtsSection({ resumeData }) {
    const [jobDescription, setJobDescription] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCheck = async () => {
        if (!jobDescription) return setError("Please paste a JD.");
        setError(""); setLoading(true);
        try {
            const data = await fetchAtsScore(jobDescription, resumeToPlainText(resumeData));
            setResult(data);
        } catch (err) { setError("Analysis failed."); } finally { setLoading(false); }
    };

    const handleDownload = async () => {
        setPdfLoading(true);
        try { await downloadResumePDF(resumeData); } catch (err) { alert("PDF Error"); } finally { setPdfLoading(false); }
    };

    const missing = result ? result.jobKeywords.filter(k => !result.matchedKeywords.includes(k)) : [];

    return (
        <div className="ats-section">
            <div className="pdf-bar">
                <span>Get your professional PDF copy</span>
                <button className="btn-pdf" onClick={handleDownload} disabled={pdfLoading}>{pdfLoading ? <div className="loader" /> : "Download PDF"}</button>
            </div>

            <div className="ats-panel">
                <h2 className="ats-title">ATS Optimization Lab</h2>
                <textarea className="ats-textarea" rows={6} placeholder="Paste JD here..." value={jobDescription} onChange={e => setJobDescription(e.target.value)} />
                {error && <p className="error">{error}</p>}
                <button className="btn-ats" onClick={handleCheck} disabled={loading}>{loading ? <div className="loader" /> : "Analyze Match"}</button>

                {result && <div className="ats-results">
                    <div className="result-header">
                        <ScoreRing score={result.matchScore} />
                        <div className="suggestions">
                            <strong>Optimization Suggestions:</strong>
                            <p>{result.matchScore < 70 ? `Try adding keywords like "${missing.slice(0, 3).join(", ")}" to improve your score.` : "Excellent alignment with this role!"}</p>
                        </div>
                    </div>
                    <div className="kw-grid">
                        <div className="kw-box matched"><span>Matched</span>{result.matchedKeywords.map(k => <i key={k}>{k}</i>)}</div>
                        <div className="kw-box missing"><span>Missing</span>{missing.map(k => <i key={k}>{k}</i>)}</div>
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default AtsSection;
