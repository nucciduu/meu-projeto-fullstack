const express = require('express');
const router = express.Router();
const List = require('../models/List');
const auth = require('../middleware/authMiddleware');

// Criar uma nova lista
router.post('/', auth, async (req, res) => {
  try {
    const { nomeDaLista, itens } = req.body;
    const novaLista = new List({
      usuario: req.user.id,
      nomeDaLista,
      itens
    });
    const lista = await novaLista.save();
    res.json(lista);
  } catch (err) {
    res.status(500).send("Erro ao criar lista");
  }
});

// Buscar todas as listas do usuário logado
router.get('/', auth, async (req, res) => {
  try {
    const listas = await List.find({ usuario: req.user.id }).populate('itens.produto');
    res.json(listas);
  } catch (err) {
    res.status(500).send("Erro ao buscar listas");
  }
});

module.exports = router;