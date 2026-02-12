const express = require("express");
const cors = require("cors");

const auditRoute = require("./routes/audit");
const chatRoute = require("./routes/chat");
const strategyCallRoute = require("./routes/strategyCall");
const contactRoute = require("./routes/contact");

const chatRoute = require("./routes/chat");

const app = express();

const auditRoute = require("./routes/audit");


// middleware
app.use(cors());
app.use("/audit", auditRoute);

app.use("/chat", chatRoute);
app.use("/strategy-call", strategyCallRoute);
app.use("/contact", contactRoute);




app.use(express.json()); // bodyParser is no longer needed

// health check
app.get("/", (req, res) => {
  res.send("Aiden backend is running 🚀");
});

// Aiden chat endpoint
app.use("/chat", chatRoute);
app.use("/api/strategy-call", strategyCallRoute);


// Railway port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
