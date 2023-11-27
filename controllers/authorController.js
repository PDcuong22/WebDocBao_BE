const AuthorModel = require("../models/authorsModel");

const getAllAuthor = (req, res) => {
    AuthorModel.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({error: "Loi server"});
    });
};

const createAuthor = (req, res) => {
    var authorName = req.body.authorName;
  AuthorModel.findOne({
    authorName: authorName,
  })
    .then((data) => {
      if (data) {
        res.status(400).json({ error: "Author nay da ton tai" });
      } else {
        return AuthorModel.create({ authorName: authorName });
      }
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Tao Author that bai" });
    });
};

module.exports = { getAllAuthor, createAuthor };