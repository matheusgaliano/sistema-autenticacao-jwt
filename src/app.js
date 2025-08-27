const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const { connectToPostgres } = require("./models/user-postgres"); // Exemplo com Postgres

const app = express();
const PORT = 3003;

app.use(bodyParser.json());
app.use("/api", authRoutes);

// Conecte-se aos bancos de dados
connectToPostgres();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
