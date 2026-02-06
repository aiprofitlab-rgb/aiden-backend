const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

// health check
app.get("/", (req, res) => {
  res.send("Aiden backend is running 🚀");
});

// CHAT ENDPOINT (Aiden brain entry)
app.post("/chat", async (req, res) => {
  const { message, sessionId } = req.body;

  // later this will call OpenAI + Google Sheets
  console.log("Chat message:", message);

  res.json({
    reply: "Got it 👍 Aiden is listening."
  });
});

// AUDIT FORM ENDPOINT
app.post("/audit", async (req, res) => {
  const auditData = req.body;

  console.log("Audit submission:", auditData);

  // later: Google Sheets + Email + WhatsApp
  res.json({
    success: true,
    message: "Audit received. We’ll contact you shortly."
  });
});

// IMPORTANT: Railway port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
