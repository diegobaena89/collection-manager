const Collection = require('../models/Collection');
const User = require('../models/User');

module.exports = class CollectionControler {
  static async showCollections(req, res) {
    res.render('collections/home');
  }

  static async dashboard(req, res) {
    res.render('collections/dashboard');
  }
};
