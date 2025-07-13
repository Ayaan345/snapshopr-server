const router = require("express").Router();
const { getProfile } = require("../controllers/userCtrl");
const { protect } = require("../middleware/auth");


router.get("/profile", protect, getProfile);


module.exports = router;