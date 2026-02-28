const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/authMiddleware');

// @route   POST api/products
// @desc    Cadastrar um produto (PROTEGIDO)
router.post('/', auth, async (req, res) => {
  try {
    const { nome, preco, descricao, quantidade } = req.body;
    
    const newProduct = new Product({
      nome,
      preco,
      descricao,
      quantidade,
      usuario: req.user.id // Pegamos o ID do usuário que veio do Token!
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    res.status(500).send("Erro ao salvar produto");
  }
});

// @route   GET api/products
// @desc    Listar todos os produtos do usuário logado
router.get('/', auth, async (req, res) => {
  try {
    const products = await Product.find({ usuario: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).send("Erro ao buscar produtos");
  }
});

module.exports = router;