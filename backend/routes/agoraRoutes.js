const express = require("express");
const { generateAgoraToken } = require("../controllers/agoraController");
const router = express.Router();

router.post("/token", generateAgoraToken);

module.exports = router;
