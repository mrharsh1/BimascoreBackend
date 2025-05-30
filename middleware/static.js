const jwt = require('jsonwebtoken')
module.exports = {
  loginToken: function (table, tokenKey, exp='30d') {
    const token = jwt.sign(table, tokenKey, {
      expiresIn: exp
      // expiresIn: '10s'
    })
    return token
  },
  verifyToken: async function (req, res, next) {
    const token = req.headers['x-access-token'];
	
    if (!token){
      return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    // Static token verification
    if (token !== process.env.APP_STATIC_KEY) {
      return res.status(403).send({ auth: false, message: 'Invalid token.' });
    }

    next();
  }
}