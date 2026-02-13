const express = require("express");
const router = express.Router();

const getOpenAI = require("../config/openai");
const systemPrompt = require("../prompts/systemPrompt");
const { addRow } = require("../sheets");

// POST /chat
router.post("/", async (req, res) => {
  try {
    const {
      message,
      sessionId,
      email,
      phone,
      industry,
      visitorType,
      country,
      language
    } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const openai = getOpenAI();

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;

    // ✅ Save to CRM if email exists
    if (email) {
      await addRow("Aiden_Chat", [
        new Date().toISOString(),
        sessionId || "",
        "Website",
        language || "",
        country || "",
        visitorType || "",
        industry || "",
        email,
        phone || "",
        message,
        reply
      ]);
    }

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
