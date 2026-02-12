const express = require("express");
const router = express.Router();
const { addRow } = require("../sheets");

router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      company,
      role,
      website,
      industry,
      employees,
      revenue,
      revenueStreams,
      challenges,
      goals,
      pastExperience,
      aiComfort,
      process
    } = req.body;

    const processes = Array.isArray(process)
      ? process.join(", ")
      : process || "";

    await addRow("Audit_Leads", [
      new Date().toISOString(),
      fullName || "",
      email || "",
      phone || "",
      company || "",
      role || "",
      website || "",
      industry || "",
      employees || "",
      revenue || "",
      revenueStreams || "",
      challenges || "",
      goals || "",
      pastExperience || "",
      aiComfort || "",
      processes,
      "New"
    ]);

    res.json({
      success: true,
      message: "Audit saved to CRM",
    });

  } catch (error) {
    console.error("AUDIT ERROR:", error);
    res.status(500).json({
      success: false,
      error: "Failed to save audit",
    });
  }
});

module.exports = router;
