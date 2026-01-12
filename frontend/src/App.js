import { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import "./styles/resume.css";

function App() {
  const [resumeData, setResumeData] = useState({});

  return (
    <div className="container">
      <div className="form-section">
        <ResumeForm
          resumeData={resumeData}
          setResumeData={setResumeData}
        />
      </div>

      <div className="preview-section">
        <ResumePreview resumeData={resumeData} />
      </div>
    </div>
  );
}

export default App;
