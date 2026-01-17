export async function getAtsScore(jobDescription, resumeText) {
  const response = await fetch("http://localhost:5000/api/ats/score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jobDescription,
      resumeText,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch ATS score");
  }

  return response.json();
}
