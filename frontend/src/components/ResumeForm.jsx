import React from "react";
import "./ResumeForm.css";

const INITIAL_DATA = {
  fullName: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  summary: "",
  skills: "",
  experience: "",
  education: "",
};

function ResumeForm({ resumeData, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...resumeData, [name]: value });
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <span className="form-icon">📝</span>
        <h2 className="form-title">Build Your Resume</h2>
      </div>

      <div className="form-section">
        <h3 className="section-label">Personal Info</h3>

        <div className="input-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            placeholder="e.g. Jane Doe"
            value={resumeData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="jane@example.com"
              value={resumeData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="+1 (555) 000-0000"
              value={resumeData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="linkedin">LinkedIn URL</label>
            <input
              id="linkedin"
              type="url"
              name="linkedin"
              placeholder="linkedin.com/in/janedoe"
              value={resumeData.linkedin}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="github">GitHub URL</label>
            <input
              id="github"
              type="url"
              name="github"
              placeholder="github.com/janedoe"
              value={resumeData.github}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-label">Professional Summary</h3>
        <div className="input-group">
          <textarea
            id="summary"
            name="summary"
            rows={4}
            placeholder="Write a brief summary of your professional background and goals..."
            value={resumeData.summary}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-label">Skills</h3>
        <div className="input-group">
          <label htmlFor="skills">Skills (comma-separated)</label>
          <input
            id="skills"
            type="text"
            name="skills"
            placeholder="React, Node.js, Python, SQL, Git..."
            value={resumeData.skills}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-label">Experience</h3>
        <div className="input-group">
          <textarea
            id="experience"
            name="experience"
            rows={5}
            placeholder="Company Name | Role | Duration&#10;• Key achievement or responsibility&#10;• Another achievement..."
            value={resumeData.experience}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-label">Education</h3>
        <div className="input-group">
          <textarea
            id="education"
            name="education"
            rows={4}
            placeholder="Degree, Major | University | Year&#10;GPA, Honors, or relevant courses..."
            value={resumeData.education}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export { INITIAL_DATA };
export default ResumeForm;
