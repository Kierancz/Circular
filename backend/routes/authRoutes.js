const passport = require('passport');
const checkPath = require('../middlewares/checkPath');

module.exports = app => {
  // Google Auth Routes
  app.get(
    '/auth/google',
    checkPath,
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect(req.session.returnTo);
      delete req.session.returnTo;
    }
  );

  // Local Auth Route
  app.get(
    'auth/local/register',
    checkPath,
    passport.authenticate('local', {
      scope: ['username', 'password']
    })
  );

  app.post(
    '/auth/local/callback',
    passport.authenticate('local', { failureRedirect: '/error' }),
    function(req, res) {
      res.redirect('/success?username=' + req.user.username);
    }
  );

  // Facebook Auth Routes
  app.get(
    '/auth/facebook',
    checkPath,
    passport.authenticate('facebook', {
      scope: ['public_profile', 'email']
    })
  );

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook'),
    (req, res) => {
      res.redirect(req.session.returnTo);
      delete req.session.returnTo;
    }
  );

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send({});
  });
};
