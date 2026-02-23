/**
 * Unified API service layer
 * All calls target the Express backend at localhost:5000
 */

const BASE_URL = "http://localhost:5000/api";

// ── Helpers ──────────────────────────────────────────────────────────────────

async function post(endpoint, body) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Request failed (${res.status})`);
    }

    return res;
}

// ── ATS Score ─────────────────────────────────────────────────────────────────
/**
 * @param {string} jobDescription
 * @param {string} resumeText  – plain-text version of the resume
 * @returns {{ matchScore: number, matchedKeywords: string[], jobKeywords: string[], resumeKeywords: string[] }}
 */
export async function fetchAtsScore(jobDescription, resumeText) {
    const res = await post("/ats/score", { jobDescription, resumeText });
    return res.json();
}

// ── PDF Generation ────────────────────────────────────────────────────────────
/**
 * @param {object} resumeData – structured resume object
 * Triggers a file-download of the generated PDF.
 */
export async function downloadResumePDF(resumeData) {
    const res = await fetch(`${BASE_URL}/pdf/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeData),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "PDF generation failed");
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

// ── Resume Text Converter ─────────────────────────────────────────────────────
/**
 * Converts a structured resume object into plain text for ATS scoring.
 * @param {object} resumeData
 * @returns {string}
 */
export function resumeToPlainText(resumeData) {
    const {
        fullName = "",
        email = "",
        phone = "",
        linkedin = "",
        github = "",
        summary = "",
        skills = "",
        experience = "",
        education = "",
    } = resumeData;

    return [
        fullName,
        [email, phone, linkedin, github].filter(Boolean).join(" | "),
        summary ? `Summary:\n${summary}` : "",
        skills ? `Skills:\n${skills}` : "",
        experience ? `Experience:\n${experience}` : "",
        education ? `Education:\n${education}` : "",
    ]
        .filter(Boolean)
        .join("\n\n");
}
