const BASE_URL = "http://localhost:5000/api";

export async function fetchAtsScore(jobDescription, resumeText) {
    const res = await fetch(`${BASE_URL}/ats/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription, resumeText }),
    });
    if (!res.ok) throw new Error("Scoring failed");
    return res.json();
}

export async function downloadResumePDF(resumeData) {
    const res = await fetch(`${BASE_URL}/pdf/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeData),
    });
    if (!res.ok) throw new Error("PDF failed");
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "resume.pdf";
    document.body.appendChild(a); a.click(); a.remove();
}

export function resumeToPlainText(data) {
    return `${data.fullName}\n${data.email} | ${data.phone}\n\nSummary:\n${data.summary}\n\nSkills:\n${data.skills}\n\nExperience:\n${data.experience}\n\nEducation:\n${data.education}`;
}
