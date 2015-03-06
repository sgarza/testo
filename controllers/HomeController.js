var HomeController = Class('HomeController')({
  prototype : {
    init : function (){
      this._initRouter();
      return this;
    },

    _initRouter : function() {
      application.router.route('/')
        .get(this.index);

      application.router.route('/login')
        .get(this.login);
    },

    index : function(req, res) {
      res.render('home/index.html', {layout : 'application', posts : ["1", "2", "3", "4", "5"]});
    },

    login : function(req, res) {
      res.render('home/login.html', {layout : 'application'});
    },
  }
});

module.exports = new HomeController();
