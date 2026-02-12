const express = require("express");
const cors = require("cors");

const auditRoute = require("./routes/audit");
const chatRoute = require("./routes/chat");
const strategyCallRoute = require("./routes/strategyCall");
const contactRoute = require("./routes/contact");

const app = express();

// middleware
app.use(cors());
app.use(express.json()); // IMPORTANT: must come before routes

// health check
app.get("/", (req, res) => {
  res.send("Aiden backend is running 🚀");
});

// routes
app.use("/audit", auditRoute);
app.use("/chat", chatRoute);
app.use("/strategy-call", strategyCallRoute);
app.use("/contact", contactRoute);

// Railway port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
