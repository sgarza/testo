var UsersController = Class('UsersController').inherits(RestfulController)({
  prototype : {
    index : function index(req, res) {
      User.all(function(err, users) {
        if (err) {
          return res.status(500).send(err);
        }

        res.render('users/index.html', {layout : 'application', users: users});
      });
    },

    show : function show(req, res) {
      User.findById(req.params.id, function(err, user) {
        if (err) {
          return res.status(500).send(err);
        }

        res.render('users/show.html', {layout : 'application', user : user});
      });
    },

    new : function(req, res) {
      res.render('users/new.html');
    },

    create : function create(req, res) {
      User.findBy('email', req.body.email, function(err, existingUser) {
        if (err) {
          return res.status(500).send(err);
        }

        if (existingUser.length !== 0) {
          return res.redirect('/users');
        } else {
          var userInstance = new User(req.body);

          var originalPassword = userInstance.password;

          userInstance.setPassword(userInstance.password);

          userInstance.save(function(err, user) {
            if (err) {
              return res.status(500).send(err);
            }

            res.redirect('/user/' + user[0]);
          });
        }
      });
    },

    edit : function edit(req, res) {
      User.findById(req.params.id, function(err, user) {
        if (err) {
          return res.status(500).send(err);
        }

        if (user.length === 0) {
          return res.status(404).send('Not Found');
        }

        res.render('users/edit.html', {layout : 'application', user : user});
      });
    },

    update : function update(req, res) {
      var userData = req.body;

      userData.id = req.params.id;

      var user = new User(userData);

      if (userData.password) {
        user.setPassword(userData.password);
      }

      user.save(function(err, result) {
        if (err) {
          return res.status(500).send(err);
        }

        res.redirect('/user/' + result[0]);
      });
    },

    destroy : function destroy(req, res) {
      User.findById(req.params.id, function(err, result) {
        if (err) {
          return res.status(500).send(err);
        }

        var user = new User(result);

        user.destroy(function(err, data) {
          if (err) {
            return res.status(500).send(err);
          }

          res.redirect('/users');
        })
      });
    }
  }
});

module.exports = new UsersController();
