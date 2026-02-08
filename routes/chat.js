const express = require("express");
const router = express.Router();

const getOpenAI = require("../config/openai");
const systemPrompt = require("../prompts/systemPrompt");

// POST /chat
router.post("/", async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const openai = getOpenAI();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;

    res.json({
      reply,
      sessionId: sessionId || null,
    });
  } catch (error) {
    console.error("Aiden chat error:", error.message);

    res.status(500).json({
      error: "Aiden is thinking too hard right now 🤯 Please try again.",
    });
  }
});

module.exports = router;
