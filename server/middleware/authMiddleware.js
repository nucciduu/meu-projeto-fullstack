const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Pegar o token do cabeçalho da requisição
  const token = req.header('x-auth-token');

  // Se não tiver token, barra o acesso
  if (!token) return res.status(401).json({ msg: "Sem token, autorização negada" });

  try {
    // Validar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Coloca o ID do usuário dentro da requisição
    next(); // Pode passar para a próxima função
  } catch (err) {
    res.status(401).json({ msg: "Token inválido" });
  }
};