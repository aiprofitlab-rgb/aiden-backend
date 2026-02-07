const express = require("express");
const router = express.Router();
const openai = require("../config/openai");
const systemPrompt = require("../prompts/aidenSystem");

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    res.json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Aiden is tired 😴" });
  }
});

module.exports = router;
