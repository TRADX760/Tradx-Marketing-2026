const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "TradX Backend is running 🚀"
  });
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "online",
    service: "TradX Backend"
  });
});

app.listen(PORT, () => {
  console.log(`TradX Backend running on port ${PORT}`);
});
