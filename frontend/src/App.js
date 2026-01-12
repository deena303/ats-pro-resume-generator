import { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";

function App() {
  const [resumeData, setResumeData] = useState({});

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <ResumeForm
        resumeData={resumeData}
        setResumeData={setResumeData}
      />
      <ResumePreview resumeData={resumeData} />
    </div>
  );
}

export default App;
