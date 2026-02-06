import React, { useState } from "react";
import ResumeForm from "./components/ResumeForm";

function App() {
  const [resumeData, setResumeData] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>ATS-Pro Resume Builder</h1>

      <ResumeForm onResumeChange={setResumeData} />

      <hr />

      <h3>Resume Data (Preview)</h3>
      <pre>{JSON.stringify(resumeData, null, 2)}</pre>
    </div>
  );
}

export default App;
