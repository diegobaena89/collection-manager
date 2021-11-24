const { col } = require('sequelize/dist');
const Collection = require('../models/Collection');
const User = require('../models/User');

module.exports = class CollectionControler {
  static async showCollections(req, res) {
    res.render('collections/home');
  }

  static async dashboard(req, res) {
    const userId = req.session.userid;

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: Collection,
      plain: true,
    });

    // check if user exists
    if (!user) {
      res.redirect('/login');
    }

    const collections = user.Collections.map((result) => result.dataValues);

    res.render('collections/dashboard', { collections });
  }

  static createCollection(req, res) {
    res.render('collections/create');
  }

  static async createCollectionSave(req, res) {
    const collection = {
      title: req.body.title,
      author: req.body.author,
      image: req.body.image,
      UserId: req.session.userid,
    };

    try {
      await Collection.create(collection);

      req.flash('message', 'Collection created successfully!');

      req.session.save(() => {
        res.redirect('/collections/dashboard');
      });
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  }
};
