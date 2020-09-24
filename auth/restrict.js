const jwt = require('jsonwebtoken');
const {jwtSecret }= require('./secret')

function restrict() {
  return async (req, res, next) => {
    const authError = {
      message: 'Invalid credentials',
    };

    try {
      const token = req.cookies.token;
      console.log(token);
      if (!token) {
        return res.status(401).json(authError);
      }

      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
          console.log(err);
          return res.status(401).json(authError);
        }

        console.log(decoded.userRole);

        if (decoded.userRole != 'admin') {
          return res.status(403).json({
            message: 'You shall not pass',
          });
        }

        req.token = decoded;
        next();
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = restrict;
