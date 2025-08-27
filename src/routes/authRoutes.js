const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const authenticateToken = require("../middlewares/authMiddleware");

router.post("/register", register);

router.post("/login", login);

router.get("/profile", authenticateToken, (req, res) => {
  res.status(200).json({
    message: "Acesso autorizado ao perfil.",
    user: req.user,
  });
});

module.exports = router;
