const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- MIDDLEWARES ---
app.use(express.json());
app.use(cors());

// --- CONEXÃO COM O BANCO ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Conectado com sucesso!"))
  .catch(err => console.log("❌ Erro ao conectar:", err));

// --- ROTAS DA API ---
// Rota de Teste (só para saber se o servidor está vivo)
app.get('/', (req, res) => res.send("API Rodando!"));

// Rota de Autenticação (Login e Cadastro)
app.use('/api/auth', require('./routes/auth'));

// 🚀 AQUI ESTÁ A LINHA NOVA QUE VOCÊ DEVE ADICIONAR:
app.use('/api/products', require('./routes/products'));


app.use('/api/lists', require('./routes/lists'));


// --- INICIALIZAÇÃO DO SERVIDOR ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor voando na porta ${PORT}`));