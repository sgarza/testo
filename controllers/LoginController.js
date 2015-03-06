var LoginController = Class('LoginController')({
  prototype : {
    init : function (){
      this._initRouter();
      return this;
    },

    _initRouter : function() {
      application.router.route('/login')
        .post(this.login);

      application.router.route('/logout')
        .get(this.logout);
    },

    login : function(req, res, next) {
      passport.authenticate('local-login', function(err, user, info) {
        if (err) { return next(err); }

        if (!user) {
          // Wrong password
          return res.redirect('/login');
        }

        req.session.cookie.expires = new Date(Date.now() + 3600000 * 24 * 365);

        req.logIn(user, function(err) {
          if (err) { return next(err); }

          // Success
          return res.redirect('/');
        });

      })(req, res, next);
    },

    logout : function(req, res) {
      req.session.destroy();
      res.redirect('/');
    }
  }
});

module.exports = new LoginController();
