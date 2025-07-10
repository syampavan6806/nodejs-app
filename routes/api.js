
const express = require('express');
const router = express.Router();

router.get('/ping', (req, res) => {
  res.json({ message: "Pong! Backend API is working" });
});
router.get('/health', (req, res) => {
  res.json({ health: "Backend API is healthy" });
});

module.exports = router;
