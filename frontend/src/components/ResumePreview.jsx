import React from "react";
import "./ResumePreview.css";

function ResumePreview({ resumeData }) {
  const { fullName, email, phone, linkedin, github, summary, skills, experience, education } = resumeData;
  const skillList = skills ? skills.split(",").map(s => s.trim()).filter(Boolean) : [];
  const isEmpty = !fullName && !email && !summary && !skillList.length;

  if (isEmpty) return (
    <div className="preview-container">
      <div className="preview-empty">
        <div className="preview-empty-icon">📄</div>
        <p>Preview will appear here</p>
        <span>Fill in the form to see your resume come to life.</span>
      </div>
    </div>
  );

  return (
    <div className="preview-container">
      <div className="resume-paper">
        <div className="resume-header">
          <h1 className="resume-name">{fullName || "Your Name"}</h1>
          <div className="resume-contact">
            {email && <span className="contact-item">✉ {email}</span>}
            {phone && <span className="contact-item">📞 {phone}</span>}
            {linkedin && <span className="contact-item">🔗 LinkedIn</span>}
            {github && <span className="contact-item">💻 GitHub</span>}
          </div>
        </div>

        {summary && <section className="resume-section">
          <h2 className="resume-section-title">Summary</h2>
          <div className="resume-divider" /><p className="resume-paragraph">{summary}</p>
        </section>}

        {skillList.length > 0 && <section className="resume-section">
          <h2 className="resume-section-title">Skills</h2>
          <div className="resume-divider" />
          <ul className="skills-list">
            {skillList.map((s, i) => <li key={i} className="skill-item">{s}</li>)}
          </ul>
        </section>}

        {experience && <section className="resume-section">
          <h2 className="resume-section-title">Experience</h2>
          <div className="resume-divider" /><p className="resume-paragraph preformatted">{experience}</p>
        </section>}

        {education && <section className="resume-section">
          <h2 className="resume-section-title">Education</h2>
          <div className="resume-divider" /><p className="resume-paragraph preformatted">{education}</p>
        </section>}
      </div>
    </div>
  );
}

export default ResumePreview;
