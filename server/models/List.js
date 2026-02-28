const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nomeDaLista: { type: String, required: true },
  itens: [
    {
      produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantidade: { type: Number, default: 1 }
    }
  ],
  dataCriacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('List', ListSchema);