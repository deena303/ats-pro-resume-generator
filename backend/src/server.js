const atsRoutes = require("./routes/atsRoutes");
const express = require("express");
const cors = require("cors");

const jdRoutes = require("./routes/jdRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/jd", jdRoutes);
app.use("/api/ats", atsRoutes);
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
