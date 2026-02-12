const express = require("express");
const router = express.Router();
const { addRow } = require("../sheets");

router.post("/", async (req, res) => {
  try {
    const { fullName, email, phone, company, message } = req.body;

    await addRow("Contact_Leads", [
      new Date().toISOString(),
      fullName || "",
      email || "",
      phone || "",
      company || "",
      message || "",
      "New"
    ]);

    res.json({
      success: true,
      message: "Contact saved to CRM",
    });

  } catch (error) {
    console.error("CONTACT ERROR:", error);
    res.status(500).json({
      success: false,
      error: "Failed to save contact",
    });
  }
});

module.exports = router;
