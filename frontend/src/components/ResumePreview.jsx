import React from "react";

const ResumePreview = ({ resumeData }) => {
  return (
    <div>
      <h2>Live Preview</h2>

      <h3>{resumeData.name}</h3>

      <h4>Experience</h4>
      <p>{resumeData.experience}</p>

      <h4>Skills</h4>
      <p>{resumeData.skills}</p>
    </div>
  );
};

export default ResumePreview;
