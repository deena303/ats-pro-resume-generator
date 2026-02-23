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
        <h3 className="section-label">Personal details</h3>
        <div className="input-group">
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" name="fullName" type="text" placeholder="e.g. Jane Doe" value={resumeData.fullName} onChange={handleChange} />
        </div>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="jane@example.com" value={resumeData.email} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" value={resumeData.phone} onChange={handleChange} />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-label">Professional Info</h3>
        <div className="input-group">
          <label htmlFor="summary">Summary</label>
          <textarea id="summary" name="summary" rows={3} placeholder="Brief career overview..." value={resumeData.summary} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="skills">Skills (comma-separated)</label>
          <input id="skills" name="skills" type="text" placeholder="React, Node.js, SQL..." value={resumeData.skills} onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-label">Experience & Education</h3>
        <div className="input-group">
          <label htmlFor="experience">Experience</label>
          <textarea id="experience" name="experience" rows={5} placeholder="Role | Company | Duration..." value={resumeData.experience} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="education">Education</label>
          <textarea id="education" name="education" rows={3} placeholder="Degree | University..." value={resumeData.education} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}

export { INITIAL_DATA };
export default ResumeForm;
