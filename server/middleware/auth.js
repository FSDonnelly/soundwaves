const { User } = require('../models/user');

let auth = async (req, res, next) => {
  let token = await req.cookies.w_auth;

  await User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
