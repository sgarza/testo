var User = Class('User').inherits(Model)({

  validations : {
    email : {
      email : {
        message : 'El email no es valido.'
      },
      length : {
        maximum : 255,
        tooLong : 'El email debe ser de %{count} caracteres maximo.'
      }
    }
  },

  all : function(callback) {
    application.db('Users')
      .exec(callback)
  },

  findBy : function(property, value, callback) {
    property = property || 'id';

    application.db('Users')
      .where(property, value)
      .exec(callback)

  },

  findById : function(id, callback) {
    application.db('Users')
      .where('id', id)
      .exec(function(err, result) {
        if (err) {callback(err)};

        result = result[0];

        callback(null, result);
      });

  },

  prototype : {
    id                : null,
    email             : null,
    password          : null,
    name              : null,
    token             : null,
    createdAt         : null,
    updatedAt         : null,

    _create : function _create(callback) {
      var model = this;
      model.createdAt = new Date();
      model.updatedAt = new Date();

      var record = model;

      delete record.eventListeners;

      logger.log('Creating', record)

      application.db('Users')
        .insert(record)
        .returning('id')
        .exec(callback);
    },

    _update : function _update(callback) {
      var model = this;

      var id = model.id;

      delete model.id;
      delete model.createdAt;

      var record = model;

      delete record.eventListeners;

      model.updatedAt = new Date();

      application.db('Users')
        .where('id', id)
        .update(record)
        .returning('id')
        .exec(callback);
    },

    setPassword : function setPassword(password) {
      var model = this;

      model.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

      return model.password;
    },

    isValidPassword : function isValidPassword(password) {
      var model = this;

      return bcrypt.compareSync(password, model.password);
    },

    _destroy : function _destroy(callback) {
      var model = this;

      application.db('Users')
        .where('id', model.id)
        .del()
        .exec(callback);
    }
  }
});

module.exports = User;
