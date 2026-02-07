const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const chatRoute = require("./routes/chat");

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

// health check
app.get("/", (req, res) => {
  res.send("Aiden backend is running 🚀");
});

// Aiden chat endpoint
app.use("/chat", chatRoute);

// Railway port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
