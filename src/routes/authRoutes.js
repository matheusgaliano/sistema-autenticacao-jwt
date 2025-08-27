const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const authenticateToken = require("../middlewares/authMiddleware"); // Importe o middleware

// Rota de registro
router.post("/register", register);

// Rota de login
router.post("/login", login);

// Rota protegida - só pode ser acessada com um token JWT válido
router.get("/profile", authenticateToken, (req, res) => {
  res.status(200).json({
    message: "Acesso autorizado ao perfil.",
    user: req.user,
  });
});

module.exports = router;
