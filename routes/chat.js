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
      language,
      page
    } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const openai = getOpenAI();

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;

    // ✅ ALWAYS save to CRM - removed email condition
    // Create a default email if none provided
    const chatEmail = email || `chat_${sessionId || Date.now()}@temp.local`;
    
    await addRow("Aiden_Chat", [
      new Date().toISOString(),
      sessionId || "unknown",
      page || "Website",
      language || "unknown",
      country || "unknown",
      visitorType || "website_visitor",
      industry || "unknown",
      chatEmail,
      phone || "",
      message,
      reply
    ]);

    res.json({
      reply,
      sessionId: sessionId || null,
      success: true
    });

  } catch (error) {
    console.error("Aiden chat error:", error.message);

    res.status(500).json({
      error: "Aiden is thinking too hard right now 🤯 Please try again.",
      success: false
    });
  }
});

module.exports = router;
