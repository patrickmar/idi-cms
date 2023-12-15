const express = require("express");
const { createVlog, fetchVlog } = require("../controllers/vlogController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(fetchVlog).post(protect, createVlog);

module.exports = router;
