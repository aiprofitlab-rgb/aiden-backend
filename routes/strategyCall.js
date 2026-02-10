const express = require("express");
const router = express.Router();
const { Resend } = require("resend");
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const { name, email, message, source } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Missing name or email" });
    }

    // 1️⃣ Send email
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Aiden <onboarding@resend.dev>",
      to: [email, process.env.ADMIN_EMAIL],
      subject: "Your Free Strategy Call",
      html: `
        <h3>Thanks ${name} 👋</h3>
        <p>We received your request for a free strategy call.</p>
        <p><strong>Message:</strong> ${message || "—"}</p>
      `,
    });

    // 2️⃣ Send WhatsApp notification
    const whatsappText = `
🔥 New Strategy Call Lead
Name: ${name}
Email: ${email}
Source: ${source || "Website"}
    `;

    await axios.get(
      `https://api.callmebot.com/whatsapp.php?phone=${process.env.WHATSAPP_NUMBER}&text=${encodeURIComponent(
        whatsappText
      )}&apikey=${process.env.CALLMEBOT_API_KEY}`
    );

    res.json({ success: true });
  } catch (error) {
  console.error("STRATEGY CALL ERROR:", error);
  res.status(500).json({
    error: error.message || "Unknown error",
    details: error.response?.data || null
  });
}

});

module.exports = router;
