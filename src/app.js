const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const { connectToPostgres } = require("./models/user-postgres");

const app = express();
const PORT = 3003;

app.use(bodyParser.json());
app.use("/api", authRoutes);

connectToPostgres();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
