const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

const AGORA_APP_ID = process.env.AGORA_APP_ID;
const AGORA_APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE;

const TOKEN_EXPIRATION_TIME = 3600; // 1 hour

const generateRtcToken = (req, res) => {
  const { channelName, uid } = req.body;

  if (!channelName || !uid) {
    return res.status(400).json({ error: "channelName and uid are required" });
  }

  // Define the role: "PUBLISHER" means the user can publish streams (i.e., be heard/seen)
  const role = RtcRole.PUBLISHER;

  // Calculate the token expiration time (from current time)
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expirationTimestamp = currentTimestamp + TOKEN_EXPIRATION_TIME;

  // Generate the RTC token using Agora's token builder
  const token = RtcTokenBuilder.buildTokenWithUid(
    AGORA_APP_ID,
    AGORA_APP_CERTIFICATE,
    channelName,
    uid,
    role,
    expirationTimestamp
  );

  // Respond with the generated token
  res.json({ token });
};

module.exports = {
  generateRtcToken,
};
