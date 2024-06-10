const jwt = require('jsonwebtoken');

const tokenVerify = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // console.log(process.env.JWT_SECRET, token)

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user, userId) => {
    if (err) return res.sendStatus(403);

    req.login = user;
    req.id = userId;
    next();
  });
};

module.exports = { tokenVerify };