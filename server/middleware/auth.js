const { User } = require('../models/user');

let auth = async (req, res, next) => {
  let token = await req.cookies.w_auth;

  User.findByToken(token, async (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });
    req.token = token;
    req.user = user;
    await next();
  });
};

module.exports = { auth };
