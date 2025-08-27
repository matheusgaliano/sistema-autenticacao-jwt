const jwt = require("jsonwebtoken");
const {
  createUserPostgres,
  findUserByEmailAndComparePasswordPostgres,
} = require("../models/user-postgres");

const JWT_SECRET = "seu-segredo-super-secreto";

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
    const userId = await createUserPostgres(email, password);

    res
      .status(201)
      .json({ message: "Usuário registrado com sucesso!", userId });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao registrar usuário.", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
    const isAuthenticated = await findUserByEmailAndComparePasswordPostgres(
      email,
      password
    );

    if (!isAuthenticated) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const token = jwt.sign({ email: email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login bem-sucedido!", token });
  } catch (error) {
    res.status(500).json({ message: "Erro no login.", error: error.message });
  }
};

module.exports = {
  register,
  login,
};
