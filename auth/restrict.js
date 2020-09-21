const jwt = require('jsonwebtoken');

function restrict() {
  return async (req, res, next) => {
    const authError = {
      message: 'Invalid credentials',
    };

    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json(authError);
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
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
