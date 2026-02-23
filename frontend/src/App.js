import React, { useState } from "react";
import ResumeForm, { INITIAL_DATA } from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import AtsSection from "./components/AtsSection";
import "./App.css";

function App() {
  const [resumeData, setResumeData] = useState(INITIAL_DATA);

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-logo">
          <div className="logo-icon">🚀</div>
          <h1 className="logo-text">ATS-Pro <span className="logo-sub">Resume Generator</span></h1>
        </div>
        <div className="header-right">
          <div className="header-badge">DEMO READY v4.0</div>
        </div>
      </header>

      <main className="app-main">
        <div className="panel panel-form">
          <ResumeForm resumeData={resumeData} onChange={setResumeData} />
        </div>
        <div className="panel panel-preview">
          <div className="preview-label">Live Preview</div>
          <ResumePreview resumeData={resumeData} />
        </div>
      </main>

      <AtsSection resumeData={resumeData} />
    </div>
  );
}

export default App;
