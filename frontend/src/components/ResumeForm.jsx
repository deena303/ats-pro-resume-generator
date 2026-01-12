import React from "react";

const ResumeForm = ({ resumeData, setResumeData }) => {
  const handleChange = (e) => {
    setResumeData({
      ...resumeData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Resume Details</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
      />

      <textarea
        name="experience"
        placeholder="Experience"
        onChange={handleChange}
      />

      <textarea
        name="skills"
        placeholder="Skills"
        onChange={handleChange}
      />
    </div>
  );
};

export default ResumeForm;
