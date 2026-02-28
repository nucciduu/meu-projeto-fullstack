const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Conexão com o Banco
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Conectado com sucesso!"))
  .catch(err => console.log("❌ Erro ao conectar:", err));

// Rota de Teste
app.get('/', (req, res) => res.send("API Rodando!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor voando na porta ${PORT}`));