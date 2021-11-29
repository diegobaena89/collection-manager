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

    let emptyCollections = false;

    if (collections.length === 0) {
      emptyCollections = true;
    }

    res.render('collections/dashboard', { collections, emptyCollections });
  }

  static createCollection(req, res) {
    res.render('collections/create');
  }

  static async createCollectionSave(req, res) {
    const collection = {
      title: req.body.title,
      author: req.body.author,
      image: req.body.image,
      description: req.body.description,
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

  static async removeCollection(req, res) {
    const id = req.body.id;
    const UserId = req.session.userid;

    try {
      await Collection.destroy({ where: { id: id, UserId: UserId } });

      req.flash('message', 'Collection removed successfully!');

      req.session.save(() => {
        res.redirect('/collections/dashboard');
      });
    } catch (error) {
      console.log(`Aconteceu um erro: ${error}`);
    }
  }

  static async updateCollection(req, res) {
    const id = req.params.id;

    const collection = await Collection.findOne({
      where: { id: id },
      raw: true,
    });

    res.render('collections/edit', { collection });
  }
};
