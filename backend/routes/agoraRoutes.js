const express = require("express");
const { generateRtcToken } = require("../controllers/agoraController");
const router = express.Router();

router.post("/token", generateRtcToken);

module.exports = router;
