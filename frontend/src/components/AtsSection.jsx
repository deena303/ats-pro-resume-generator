import React, { useState } from "react";
import { fetchAtsScore, resumeToPlainText, downloadResumePDF } from "../services/api";
import "./AtsSection.css";

function ScoreRing({ score }) {
    const radius = 38;
    const circ = 2 * Math.PI * radius;
    const offset = circ - (score / 100) * circ;
    const color = score >= 70 ? "#22c55e" : score >= 40 ? "#f59e0b" : "#ef4444";

    return (
        <div className="score-ring-wrapper" aria-label={`ATS Match Score: ${score}%`}>
            <svg width="96" height="96" viewBox="0 0 96 96">
                <circle cx="48" cy="48" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
                <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="8"
                    strokeDasharray={circ}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 48 48)"
                    style={{ transition: "stroke-dashoffset 0.6s ease" }}
                />
            </svg>
            <div className="score-ring-text" style={{ color }}>
                <span className="score-number">{score}</span>
                <span className="score-pct">%</span>
            </div>
        </div>
    );
}

function AtsSection({ resumeData }) {
    const [jobDescription, setJobDescription] = useState("");
    const [result, setResult] = useState(null);
    const [atsLoading, setAtsLoading] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [atsError, setAtsError] = useState("");
    const [pdfError, setPdfError] = useState("");
    const [pdfSuccess, setPdfSuccess] = useState(false);

    // ── ATS Score ──────────────────────────────────────────────────────────────
    const handleCheckAts = async () => {
        setAtsError("");
        setResult(null);

        if (!jobDescription.trim()) {
            setAtsError("Please paste a job description first.");
            return;
        }

        const resumeText = resumeToPlainText(resumeData);
        if (!resumeText.trim()) {
            setAtsError("Your resume is empty. Fill in at least a few fields.");
            return;
        }

        try {
            setAtsLoading(true);
            const data = await fetchAtsScore(jobDescription, resumeText);
            setResult(data);
        } catch (err) {
            setAtsError(err.message || "Failed to calculate ATS score.");
        } finally {
            setAtsLoading(false);
        }
    };

    // ── PDF Download ───────────────────────────────────────────────────────────
    const handleDownloadPDF = async () => {
        setPdfError("");
        setPdfSuccess(false);

        const resumeText = resumeToPlainText(resumeData);
        if (!resumeText.trim()) {
            setPdfError("Fill in your resume details before downloading.");
            return;
        }

        try {
            setPdfLoading(true);
            await downloadResumePDF(resumeData);
            setPdfSuccess(true);
            setTimeout(() => setPdfSuccess(false), 3000);
        } catch (err) {
            setPdfError(err.message || "PDF generation failed. Is the backend running?");
        } finally {
            setPdfLoading(false);
        }
    };

    // ── Missing keywords ───────────────────────────────────────────────────────
    const missingKeywords = result
        ? result.jobKeywords.filter((kw) => !result.matchedKeywords.includes(kw))
        : [];

    return (
        <div className="ats-section">
            {/* ── PDF Button ── */}
            <div className="pdf-bar">
                <div className="pdf-bar-left">
                    <span className="pdf-bar-icon">📄</span>
                    <span className="pdf-bar-title">Download Resume</span>
                </div>
                <div className="pdf-bar-right">
                    {pdfError && <span className="pdf-error">{pdfError}</span>}
                    {pdfSuccess && <span className="pdf-success">✓ Downloading…</span>}
                    <button
                        className="btn-pdf"
                        onClick={handleDownloadPDF}
                        disabled={pdfLoading}
                    >
                        {pdfLoading ? (
                            <>
                                <span className="btn-spinner" /> Generating…
                            </>
                        ) : (
                            "⬇ Download PDF"
                        )}
                    </button>
                </div>
            </div>

            {/* ── ATS Panel ── */}
            <div className="ats-panel">
                <div className="ats-panel-header">
                    <span className="ats-panel-icon">🎯</span>
                    <div>
                        <h2 className="ats-panel-title">ATS Match Analyzer</h2>
                        <p className="ats-panel-sub">
                            Paste a job description to see how well your resume matches it.
                        </p>
                    </div>
                </div>

                <div className="ats-jd-field">
                    <label htmlFor="jobDescription" className="ats-jd-label">
                        Job Description
                    </label>
                    <textarea
                        id="jobDescription"
                        className="ats-jd-textarea"
                        rows={6}
                        placeholder="Paste the job description here…"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                    />
                </div>

                {atsError && <div className="ats-error-msg">{atsError}</div>}

                <button
                    className="btn-ats"
                    onClick={handleCheckAts}
                    disabled={atsLoading}
                >
                    {atsLoading ? (
                        <>
                            <span className="btn-spinner" /> Analyzing…
                        </>
                    ) : (
                        "Check ATS Score"
                    )}
                </button>

                {/* ── Results ── */}
                {result && (
                    <div className="ats-results">
                        {/* Score ring */}
                        <div className="ats-score-row">
                            <ScoreRing score={result.matchScore} />
                            <div className="ats-score-label">
                                <strong>Match Score</strong>
                                <span>
                                    {result.matchScore >= 70
                                        ? "Great match! 🎉"
                                        : result.matchScore >= 40
                                            ? "Decent — add more keywords"
                                            : "Low match — tailor your resume"}
                                </span>
                            </div>
                        </div>

                        {/* Keyword columns */}
                        <div className="ats-keywords-grid">
                            <div className="kw-card kw-matched">
                                <h4 className="kw-card-title">
                                    ✅ Matched Keywords
                                    <span className="kw-badge">{result.matchedKeywords.length}</span>
                                </h4>
                                <ul className="kw-list">
                                    {result.matchedKeywords.length > 0 ? (
                                        result.matchedKeywords.map((kw, i) => (
                                            <li key={i}>{kw}</li>
                                        ))
                                    ) : (
                                        <li className="kw-empty">None matched</li>
                                    )}
                                </ul>
                            </div>

                            <div className="kw-card kw-missing">
                                <h4 className="kw-card-title">
                                    ❌ Missing Keywords
                                    <span className="kw-badge">{missingKeywords.length}</span>
                                </h4>
                                <ul className="kw-list">
                                    {missingKeywords.length > 0 ? (
                                        missingKeywords.map((kw, i) => (
                                            <li key={i}>{kw}</li>
                                        ))
                                    ) : (
                                        <li className="kw-empty">All keywords matched!</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AtsSection;
