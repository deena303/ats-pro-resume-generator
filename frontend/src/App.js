import React, { useState } from "react";
import ResumeForm, { INITIAL_DATA } from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import AtsSection from "./components/AtsSection";
import "./App.css";

function App() {
  const [resumeData, setResumeData] = useState({ ...INITIAL_DATA });

  return (
    <div className="app-root">
      {/* ── Top Navbar ── */}
      <header className="app-header">
        <div className="app-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">ATS-Pro</span>
          <span className="logo-sub">Resume Builder</span>
        </div>
        <div className="header-right">
          <span className="header-badge">Week 3 ✓</span>
        </div>
      </header>

      {/* ── Split Screen ── */}
      <main className="app-main">
        {/* Left: Form Panel */}
        <section className="panel panel-form" aria-label="Resume form">
          <ResumeForm resumeData={resumeData} onChange={setResumeData} />
        </section>

        {/* Divider */}
        <div className="panel-divider" />

        {/* Right: Preview Panel */}
        <section className="panel panel-preview" aria-label="Resume preview">
          <div className="preview-label">
            <span>👁 Live Preview</span>
          </div>
          <ResumePreview resumeData={resumeData} />
        </section>
      </main>

      {/* ── ATS + PDF Bar (full width below) ── */}
      <AtsSection resumeData={resumeData} />
    </div>
  );
}

export default App;
