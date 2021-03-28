const catchAsync = require('../../utils/catchAsync');
const { authService, tokenService } = require('../../services');

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.header('Authorization', `Bearer ${tokens.access.token}`);
  res.redirect('/admin');
});

module.exports = {
  login,
};
