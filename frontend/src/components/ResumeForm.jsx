import React, { useState } from "react";

const ResumeForm = ({ onResumeChange }) => {
  const [resume, setResume] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    education: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedResume = {
      ...resume,
      [name]: value,
    };

    setResume(updatedResume);

    // Send data to parent (for future ATS & PDF)
    onResumeChange(updatedResume);
  };

  return (
    <div>
      <h2>Resume Details</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={resume.name}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={resume.email}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={resume.phone}
        onChange={handleChange}
      />

      <br /><br />

      <textarea
        name="skills"
        placeholder="Skills (comma separated)"
        rows={3}
        value={resume.skills}
        onChange={handleChange}
      />

      <br /><br />

      <textarea
        name="experience"
        placeholder="Experience"
        rows={4}
        value={resume.experience}
        onChange={handleChange}
      />

      <br /><br />

      <textarea
        name="education"
        placeholder="Education"
        rows={3}
        value={resume.education}
        onChange={handleChange}
      />
    </div>
  );
};

export default ResumeForm;
