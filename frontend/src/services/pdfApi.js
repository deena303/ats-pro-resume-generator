import axios from "axios";

export async function generateResumePDF(data) {
  const response = await axios.post(
    "http://localhost:5000/api/pdf/generate",
    data,
    { responseType: "blob" }
  );

  return response.data;
}
