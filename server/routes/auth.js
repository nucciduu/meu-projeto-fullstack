const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ROTA DE CADASTRO
router.post('/register', async (req, res) => {
  try {
    const { nome, email, password } = req.body;

    // Verificar se o usuário já existe
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "Usuário já cadastrado" });

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ nome, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: "Usuário criado com sucesso!" });
  } catch (err) {
    res.status(500).send("Erro no servidor");
  }
});

// ROTA DE LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Credenciais inválidas" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Credenciais inválidas" });

    // Criar o Token JWT (O "passaporte" do usuário)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.json({ token, user: { id: user._id, nome: user.nome } });
  } catch (err) {
    res.status(500).send("Erro no servidor");
  }
});

module.exports = router;