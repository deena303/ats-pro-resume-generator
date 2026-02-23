import React from "react";
import "./ResumePreview.css";

function ResumePreview({ resumeData }) {
  const {
    fullName,
    email,
    phone,
    linkedin,
    github,
    summary,
    skills,
    experience,
    education,
  } = resumeData;

  const skillList = skills
    ? skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const hasContact = email || phone || linkedin || github;

  const isEmpty =
    !fullName &&
    !hasContact &&
    !summary &&
    !skillList.length &&
    !experience &&
    !education;

  if (isEmpty) {
    return (
      <div className="preview-container">
        <div className="preview-empty">
          <div className="preview-empty-icon">📄</div>
          <p>Your resume preview will appear here.</p>
          <span>Start filling in the form on the left.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="preview-container">
      <div className="resume-paper">
        {/* Header */}
        <div className="resume-header">
          {fullName && <h1 className="resume-name">{fullName}</h1>}

          {hasContact && (
            <div className="resume-contact">
              {email && (
                <a href={`mailto:${email}`} className="contact-item">
                  <span className="contact-icon">✉</span> {email}
                </a>
              )}
              {phone && (
                <span className="contact-item">
                  <span className="contact-icon">📞</span> {phone}
                </span>
              )}
              {linkedin && (
                <a
                  href={linkedin.startsWith("http") ? linkedin : `https://${linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-item"
                >
                  <span className="contact-icon">🔗</span> {linkedin}
                </a>
              )}
              {github && (
                <a
                  href={github.startsWith("http") ? github : `https://${github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-item"
                >
                  <span className="contact-icon">💻</span> {github}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Summary */}
        {summary && (
          <section className="resume-section">
            <h2 className="resume-section-title">Professional Summary</h2>
            <div className="resume-divider" />
            <p className="resume-paragraph">{summary}</p>
          </section>
        )}

        {/* Skills */}
        {skillList.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Skills</h2>
            <div className="resume-divider" />
            <ul className="skills-list">
              {skillList.map((skill, i) => (
                <li key={i} className="skill-item">
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Experience */}
        {experience && (
          <section className="resume-section">
            <h2 className="resume-section-title">Experience</h2>
            <div className="resume-divider" />
            <p className="resume-paragraph resume-preformatted">{experience}</p>
          </section>
        )}

        {/* Education */}
        {education && (
          <section className="resume-section">
            <h2 className="resume-section-title">Education</h2>
            <div className="resume-divider" />
            <p className="resume-paragraph resume-preformatted">{education}</p>
          </section>
        )}
      </div>
    </div>
  );
}

export default ResumePreview;
