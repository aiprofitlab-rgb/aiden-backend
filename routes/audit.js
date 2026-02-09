const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Audit route working",
      data: req.body,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

